package com.yidianpuzi.controller;

import com.yidianpuzi.Proxy.UserProxy;
import com.yidianpuzi.constants.PassportStatus;
import com.yidianpuzi.domain.Passport;
import com.yidianpuzi.service.PassportService;
import com.yidianpuzi.util.PassportResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@Slf4j
@Api(tags = "登录接口")
public class LoginController {

    @Resource
    private PassportService passportService;

    @Resource
    private UserProxy userProxy;


    @RequestMapping(value = "login", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    @ApiOperation("登录")
    @ApiImplicitParams({
            @ApiImplicitParam(name="phone" , value="手机号码" ,dataType = "String"),
            @ApiImplicitParam(name="passord" , value="密码" ,dataType = "String")}
    )
    public PassportResponse login(String phone, String passord){
        log.debug("手机：{}，密码{}",phone,passord);
        log.info("手机：{}，密码{}",phone,passord);
        log.warn("手机：{}，密码{}",phone,passord);
        log.error("手机：{}，密码{}",phone,passord);
        PassportResponse response = new PassportResponse();
        Passport passport = passportService.getPassportById(1l);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(passport);
        log.info("info1");
        log.info("info2");
        log.info("info3");
        log.info("info4");
        log.info("info5");
        return  response;
    }

}
