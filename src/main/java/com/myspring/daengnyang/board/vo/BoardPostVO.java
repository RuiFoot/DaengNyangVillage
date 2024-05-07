package com.myspring.daengnyang.board.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BoardPostVO {
    private String nickname;
    private int memberNo;
    private String category;
    private String BoardName;
    private String field;
    private String imgPath;
    private int boardId;

    /**
     * 댕냥마켓
     */
    private String tradeTime; // 거래 시간
    private String Price; // 거래 가격
    private String Area; // 거래 지역
    private String detailLocation; // 거래 장소
}
