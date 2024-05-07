package com.myspring.daengnyang.board.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BoardVO {
    private int boardId;
    private int memberNo;
    private String nickname;
    private String category;
    private String boardName;
    private Date createDate;
    private String imgPath;
    private int reviewCnt;
}
