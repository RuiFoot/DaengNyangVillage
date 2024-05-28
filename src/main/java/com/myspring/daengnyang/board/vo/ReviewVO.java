package com.myspring.daengnyang.board.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ReviewVO {
    public int boardReviewNum;
    public int boardId;
    public String nickname;
    public int memberNo;
    public String review;
    public Date createDate;
    public String profileImg;
}
