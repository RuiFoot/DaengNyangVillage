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
}
