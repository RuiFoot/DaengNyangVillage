package com.myspring.daengnyang.member.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface OauthService {
    String getKakaoAccessToken(String code);

    String getUserInfo(String accessToken);

    String kakaoLogin(String loginResult);

    String kakaoLogout(Long target_id);

    String kakaoUnlink(Long target_id);

    //---------------------------------------------------------

    /**
     * 구글
     */
    String googleLogin(String code);

    String getGoogleAccessToken(String authorizationCode);

    JsonNode getUserResource(String accessToken);


    //---------------------------------------------------------

    String getNaverAccessToken(String code, String state);

    String getNaverUserInfo(String accessToken);

    String NaverLogin(String loginResult);

}
