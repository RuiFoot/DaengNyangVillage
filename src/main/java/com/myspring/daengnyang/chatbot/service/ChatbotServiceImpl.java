package com.myspring.daengnyang.chatbot.service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URL;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.util.Date;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONArray;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

@Service
@Slf4j
public class ChatbotServiceImpl implements ChatbotService {

    @Override
    public String sendMessage(String voiceMessage) {

        String apiURL = "https://p3jljigyr4.apigw.ntruss.com/custom/v1/14115/3e6ba3ff1f9c6784da32d0980fcf6cd307350d79e75f760702b7781f73bd0c88";
        String secretKey = "eVRNWHV0V3JnYURjTHN4UE5aRE5jWk1BaHBPblNXQnM=";
        String chatbotMessage = "";
        String[] resultMessage;


        try {
            URL url = new URL(apiURL);

            System.out.println(url);

            String message = getReqMessage(voiceMessage);
            System.out.println("##" + message);

            String encodeBase64String = makeSignature(message, secretKey);

            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json;UTF-8");
            con.setRequestProperty("X-NCP-APIGW-ZONE_CD", "PUBLIC");
            con.setRequestProperty("X-NCP-CHATBOT_SIGNATURE", encodeBase64String);

            System.out.println(encodeBase64String);
            // post request
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(message.getBytes("UTF-8"));
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();

            BufferedReader br;

            if (responseCode == 200) { // Normal call
                System.out.println("responseMessage : " + con.getResponseMessage());

                BufferedReader in = new BufferedReader(
                        new InputStreamReader(
                                con.getInputStream()));
                String decodedString;
                while ((decodedString = in.readLine()) != null) {
                    chatbotMessage = decodedString;
                }
                //chatbotMessage = decodedString;
                in.close();
                // 응답 메세지 출력
                System.out.println("chatbotMessage : " + chatbotMessage);
            } else {  // Error occurred
                chatbotMessage = con.getResponseMessage();
            }
        } catch (
                Exception e) {
            System.out.println(e);
        }
        resultMessage = chatbotMessage.split("details");
        String result = resultMessage[1];
        chatbotMessage = result.substring(3, result.length()-5);
        return chatbotMessage;
    }

    public static String makeSignature(String message, String secretKey) {

        String encodeBase64String = "";

        try {
            byte[] secrete_key_bytes = secretKey.getBytes("UTF-8");

            SecretKeySpec signingKey = new SecretKeySpec(secrete_key_bytes, "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);

            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            encodeBase64String = Base64.encodeBase64String(rawHmac);

            return encodeBase64String;

        } catch (Exception e){
            System.out.println(e);
        }

        return encodeBase64String;

    }

    public static String getReqMessage(String voiceMessage) {

        String requestBody = "";

        try {

            JSONObject obj = new JSONObject();

            long timestamp = new Date().getTime();

            System.out.println("##"+timestamp);

            obj.put("version", "v1");
            obj.put("userId", "U47b00b58c90f8e47428af8b7bddc1231heo2");
//=> userId is a unique code for each chat user, not a fixed value, recommend use UUID. use different id for each user could help you to split chat history for users.

            obj.put("timestamp", timestamp);

            JSONArray bubbles_obj = new JSONArray();

            JSONObject data_obj = new JSONObject();
            data_obj.put("details", voiceMessage);

            JSONObject content_obj = new JSONObject();
            content_obj.put("data",data_obj);
            content_obj.put("type","text");
            bubbles_obj.add(content_obj);

            obj.put("content",bubbles_obj);
            obj.put("event", "send");

            requestBody = obj.toString();

            System.out.println("requestBody : " + requestBody);

        } catch (Exception e){
            System.out.println("## Exception : " + e);
        }

        return requestBody;

    }
}
