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
    private T data;
    private Pageable pageable;
}
