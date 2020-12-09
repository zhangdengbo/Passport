package com.yidianpuzi.service;

import com.yidianpuzi.domain.Passport;

public interface PassportService {

    Passport getPassport(String phone,String passwd);

    Passport getPassportById(Long id);
}
