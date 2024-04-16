package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.mapper.AnimalMapper;
import com.myspring.daengnyang.animal.vo.AnimalDetailVO;
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
    public List<String> getClassification() {
        log.info("시설 분류 정보 조회 서비스 실행");
        return animalMapper.getClassification();
    }

    @Override
    public List<AnimalLocationVO> getLocation(String classification) {
        log.info("시설 위치 정보 조회 서비스 실행");
        return animalMapper.getLocation(classification);
    }

    @Override
    public AnimalDetailVO getDetail(Integer animalNum) {
        return animalMapper.getDetail(animalNum);
    }
}
