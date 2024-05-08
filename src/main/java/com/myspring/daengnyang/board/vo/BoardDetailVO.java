package com.myspring.daengnyang.board.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BoardDetailVO {
    private int boardId;
    private String nickname;
    private int memberNo;
    private String category;
    private String boardName;
    private String field;
    private String imgPath;
    private Date createDate;
    private String preface;
    private String tradeTime;
    private String Price;
    private String Area;
    private String detailLocation;
}
