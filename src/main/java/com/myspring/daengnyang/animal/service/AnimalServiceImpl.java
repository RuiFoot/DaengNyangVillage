package com.myspring.daengnyang.animal.service;

import com.myspring.daengnyang.animal.mapper.AnimalMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalServiceImpl implements AnimalService{

    private final AnimalMapper animalMapper;

    public AnimalServiceImpl(AnimalMapper animalMapper) {
        this.animalMapper = animalMapper;
    }

    @Override
    public List<String> classification() {
        return animalMapper.getAllClassification();
    }
}
