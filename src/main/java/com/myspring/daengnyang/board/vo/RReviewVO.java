package com.myspring.daengnyang.board.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class RReviewVO {
    public int boardReviewNum; // 댓글 ID
    public int boardId; // 게시글 ID
    public String nickname;
    public int memberNo;
    public String review;
    public Date createDate;
    public String profileImg;
    public int reviewId; // 대댓글 ID
}
