package com.myspring.daengnyang.board.vo;

import lombok.Data;

import java.util.Date;

@Data
public class BoardVO {
    private int boardId;
    private int memberNo;
    private String nickname;
    private String category;
    private String boardName;
    private Date createDate;
    private int reviewCnt;
}
