package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.vo.AnimalLocationVO;

import java.util.List;

public interface AnimalService {
    List<String> classification();
    List<AnimalLocationVO> location(String classification);

}
