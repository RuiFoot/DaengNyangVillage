package com.myspring.daengnyang.common.vo;


import lombok.*;
import org.springframework.data.domain.Pageable;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Paging<T> {
    private T data; // 요청 파라미터
    private Pageable pageable; // 페이지 설정 관련
}
