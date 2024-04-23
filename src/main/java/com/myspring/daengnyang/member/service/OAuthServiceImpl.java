package com.myspring.daengnyang.member.service;



import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import com.myspring.daengnyang.member.mapper.MemberMapper;
import com.myspring.daengnyang.member.vo.MemberInfoVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.swing.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Slf4j
public class OAuthServiceImpl implements OauthService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private final MemberMapper memberMapper;
  
    @Autowired
    public OAuthServiceImpl(MemberMapper memberMapper, Environment env) {
        this.memberMapper = memberMapper;
        this.env = env;
    }

    @Override
    public String getKakaoAccessToken (String code) {
        String access_Token = "";
        String refresh_Token;
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=db0c282555cc32e78ecbce031761fc83"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:8080/member/oauth/kakao"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=").append(code);
            System.out.println(sb);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result.toString());

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    private final String kakaoAPIURL = "https://kapi.kakao.com";
    private final String appKey = "5127a1778dad2d445436482630f30dbb";

    @Override
    public String getUserInfo(String accessToken) {
        String reqURL = "/v2/user/me";
        StringBuilder result = new StringBuilder();
        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(kakaoAPIURL + reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            System.out.println("response body : " + result);

            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
    }

    @Override
    public String kakaoLogin(String loginResult) {

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(loginResult);

        log.info(element.toString());

        long id = element.getAsJsonObject().get("id").getAsLong();
        String imgPath = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image").getAsString();
        String nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
        log.info("id : " + id +"/ nickname : "+ nickname+"/ imgPath : "+ imgPath);

        if (memberMapper.getDuplicationEmail(Long.toString(id)) != null){ // 중복 된 값이 있을 경우
            log.info("이미 있는 계정 => 바로 로그인 진행");
            return Long.toString(id);
        }else{ // 없을 경우 회원가입 필요
            log.info("없는 계정 => 회원가입 후 로그인 진행 진행");
            String password = "kakao";
            memberMapper.createMember(Long.toString(id),password);
            int memberNo = memberMapper.getMemberNo(Long.toString(id));
            int cnt = memberMapper.duplicationNickname(nickname);
            MemberInfoVO userInfo = new MemberInfoVO();
            userInfo.setMemberNo(memberNo);
            if (cnt == 0){
                userInfo.setNickname(nickname);
            }else {
                userInfo.setNickname(nickname + "Kakao");
            }
            userInfo.setProfileImg(imgPath);
            userInfo.setAddress("");
            userInfo.setAddressDetail("");
            userInfo.setFavoritePet("");
            userInfo.setPhoneNumber("");
            log.info(userInfo.toString());
            memberMapper.createMemberInfo(userInfo.getNickname(), userInfo.getMemberNo(), userInfo.getProfileImg(),
                    userInfo.getAddress(), userInfo.getAddressDetail(), userInfo.getFavoritePet(), userInfo.getPhoneNumber());
            log.info("카카오 계정으로 회원가입 완료");
            return Long.toString(id);
        }
    }

    @Override
    public String kakaoLogout(Long target_id) {
        String reqURL = "/v1/user/logout";
        StringBuilder result = new StringBuilder();

        try {

            URL url = new URL(kakaoAPIURL + reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("Authorization", "KakaoAK " + appKey); //전송할 header 작성, access_token전송


            String data = "target_id_type=user_id&target_id=" + target_id;
            conn.setDoOutput(true);
            OutputStream os = conn.getOutputStream();
            os.write(data.getBytes());
            os.flush();
            os.close();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            System.out.println("response body : " + result);

            br.close();

        }catch (IOException e){
            e.printStackTrace();
        }
        return result.toString();
    }

    @Override
    public String kakaoUnlink(Long target_id) {
        String reqURL = "/v1/user/unlink";
        StringBuilder result = new StringBuilder();

        try {

            URL url = new URL(kakaoAPIURL + reqURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("Authorization", "KakaoAK " + appKey); //전송할 header 작성, access_token전송


            String data = "target_id_type=user_id&target_id=" + target_id;
            conn.setDoOutput(true);
            OutputStream os = conn.getOutputStream();
            os.write(data.getBytes());
            os.flush();
            os.close();


            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
            System.out.println("response body : " + result);

            br.close();

        }catch (IOException e){
            e.printStackTrace();
        }
        return result.toString();
    }

    @Override
    public String googleLogin(String loginResult) {
//        String accessToken = getGoogleAccessToken(code);
//        JsonNode userResourceNode = getUserResource(accessToken);
//        System.out.println("userResourceNode = " + userResourceNode);
//
//        String id = userResourceNode.get("id").asText();
//        String email = userResourceNode.get("email").asText();
//        String nickname = userResourceNode.get("name").asText();
//        System.out.println("id = " + id);
//        System.out.println("email = " + email);
//        System.out.println("nickname = " + nickname);
//
//        return id;

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(loginResult);

        log.info(element.toString());

        String id = element.getAsJsonObject().get("id").toString();

        String imgPath = element.getAsJsonObject().get("picture").toString();
        String nickname = element.getAsJsonObject().get("name").toString();
        log.info("id : " + id +"/ nickname : "+ nickname+"/ imgPath : "+ imgPath);
        String DuplicationE = memberMapper.getDuplicationEmail(id);
        if (DuplicationE != null){ // 중복 된 값이 있을 경우
            log.info("이미 있는 계정 => 바로 로그인 진행");
            return id;
        }else { // 없을 경우 회원가입 필요
            log.info("없는 계정 => 회원가입 후 로그인 진행 진행");
            String password = "google";
            memberMapper.createMember(id, password);
            int memberNo = memberMapper.getMemberNo(id);
            int cnt = memberMapper.duplicationNickname(nickname);
            MemberInfoVO userInfo = new MemberInfoVO();
            userInfo.setMemberNo(memberNo);
            if (cnt == 0) {
                userInfo.setNickname(nickname);
            } else {
                userInfo.setNickname(nickname + "google");
            }
            userInfo.setProfileImg(imgPath);
            userInfo.setAddress("");
            userInfo.setAddressDetail("");
            userInfo.setFavoritePet("");
            userInfo.setPhoneNumber("");
            log.info(userInfo.toString());
            memberMapper.createMemberInfo(userInfo.getNickname(), userInfo.getMemberNo(), userInfo.getProfileImg(),
                    userInfo.getAddress(), userInfo.getAddressDetail(), userInfo.getFavoritePet(), userInfo.getPhoneNumber());
            log.info("구글 계정으로 회원가입 완료");
            return id;
        }
    }



    @Override
    public String getGoogleAccessToken(String authorizationCode) {
        String clientId = env.getProperty("oauth2.google.client-id");
        String clientSecret = env.getProperty("oauth2.google.client-secret");
        String redirectUri = env.getProperty("oauth2.google.redirect-uri");
        String tokenUri = env.getProperty("oauth2.google.token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }

    @Override
    public JsonNode getUserResource(String accessToken) {
        String resourceUri = env.getProperty("oauth2.google.resource-uri");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }
}
