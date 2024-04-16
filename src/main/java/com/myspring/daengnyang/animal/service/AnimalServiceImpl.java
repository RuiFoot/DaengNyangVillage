package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.mapper.AnimalMapper;
import com.myspring.daengnyang.animal.vo.AnimalLocationVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AnimalServiceImpl implements AnimalService{

    private final AnimalMapper animalMapper;

    public AnimalServiceImpl(AnimalMapper animalMapper) {
        this.animalMapper = animalMapper;
    }

    @Override
    public List<String> classification() {
        log.info("시설 분류 정보 조회 서비스 실행");
        return animalMapper.getClassification();
    }

    @Override
    public List<AnimalLocationVO> location(String classification) {
        log.info("시설 위치 정보 조회 서비스 실행");
        return animalMapper.getLocation(classification);
    }
}
