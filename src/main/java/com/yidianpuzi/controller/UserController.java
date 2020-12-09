package com.yidianpuzi.controller;

import com.yidianpuzi.Proxy.UserProxy;
import com.yidianpuzi.constants.PassportStatus;
import com.yidianpuzi.domain.User;
import com.yidianpuzi.util.PassportResponse;
import com.yidianpuzi.vo.PageData;
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
import java.util.List;

@Controller
@Slf4j
@Api(tags = "用户接口")
public class UserController {

    @Resource
    private UserProxy userProxy;

    @RequestMapping(value = "findUsers", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    @ApiOperation("查询用户")
    @ApiImplicitParams({
            @ApiImplicitParam(name="userName" , value="用户名" ,dataType = "String"),
            @ApiImplicitParam(name="phone" , value="手机号" ,dataType = "String"),
            @ApiImplicitParam(name="passport" , value="账户" ,dataType = "String"),
            @ApiImplicitParam(name="pageNum" , value="页数" ,dataType = "String"),
            @ApiImplicitParam(name="pageSize" , value="页行数" ,dataType = "String")}
    )
    public PassportResponse findUsers(String userName, String phone,String passport,Integer pageNum,Integer pageSize ){
        PassportResponse response = new PassportResponse();
        pageNum =  pageNum == null ? 0 : pageNum - 1  ;
        pageSize = pageSize == null ? 20 : pageSize;
        Integer count = userProxy.findUsersCount(userName,phone,passport);
        List<User> users =  userProxy.findUsers(userName,phone,passport,pageNum ,pageSize);
        PageData<User> pageData = new PageData<>();
        pageData.setTotal(count);
        pageData.setRows(users);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(pageData);
        return  response;
    }

    @RequestMapping(value = "saveUser", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    @ApiOperation("添加用户")
    public PassportResponse saveUser(User user){
        PassportResponse response = new PassportResponse();
        userProxy.saveUser(user);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(user);
        return  response;
    }

    @RequestMapping(value = "getUserById", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    @ApiOperation("根据用户Id获取用户")
    public PassportResponse getUserById(Long id){
        PassportResponse response = new PassportResponse();
        User user = userProxy.getUserById(id);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(user);
        return  response;
    }

    @RequestMapping(value = "updateUser", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    @ApiOperation("更新用户")
    public PassportResponse updateUser(User user){
        PassportResponse response = new PassportResponse();
        userProxy.updateUser(user);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult(user);
        return  response;
    }

    @RequestMapping(value = "delUserById", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    @ApiOperation("根据用户Id删除用户")
    public PassportResponse delUserById(Long id){
        PassportResponse response = new PassportResponse();
        userProxy.deleteUserById(id);
        response.setStatus(PassportStatus.SUCCESS.getCode());
        response.setResult("删除成功");
        return  response;
    }





}
