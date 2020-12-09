package com.yidianpuzi.service.impl;

import com.yidianpuzi.domain.Passport;
import com.yidianpuzi.mapper.PassportMapper;
import com.yidianpuzi.service.PassportService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PassportServiceImpl implements PassportService {

    @Resource
    private PassportMapper passportMapper;

    @Override
    public Passport getPassport(String phone, String passwd) {
        return null;
    }

    @Override
    public Passport getPassportById(Long id) {
        return  passportMapper.selectByPrimaryKey(id);
    }
}
