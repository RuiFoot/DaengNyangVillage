package com.myspring.daengnyang.member.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.myspring.daengnyang.member.vo.MemberInfoVO;

public interface OauthService {
    String getKakaoAccessToken(String code);

    String getUserInfo(String accessToken);

    long kakaoLogin(String loginResult);

    String kakaoLogout(Long target_id);

    String kakaoUnlink(Long target_id);

    //---------------------------------------------------------

    /**
     * 구글
     */
    MemberInfoVO googleLogin(String code);

    String getGoogleAccessToken(String authorizationCode);

    JsonNode getUserResource(String accessToken);


    //---------------------------------------------------------

    String getNaverAccessToken(String code, String state);

    String getNaverUserInfo(String accessToken);

    MemberInfoVO NaverLogin(String loginResult);

    MemberInfoVO getMemberInfo(Long memberNo);
}
