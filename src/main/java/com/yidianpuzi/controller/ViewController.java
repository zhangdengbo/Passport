package com.yidianpuzi.controller;

import com.yidianpuzi.Proxy.UserProxy;
import com.yidianpuzi.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;

@Controller
@Slf4j
public class ViewController {

    @Resource
    private UserProxy userProxy;

    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/userIndex")
    public String userIndex(){
        return "user";
    }

    @RequestMapping(value = "/testIndex")
    public String testIndex(){
        return "user";
    }

    @RequestMapping(value = "/roleIndex")
    public String roleIndex(){
        return "role";
    }


    @RequestMapping(value = "/priorityIndex")
    public String priorityIndex(){
        return "priority";
    }

    @RequestMapping(value = "/toLogin")
    public String toLogin(){
        return "login";
    }

    @RequestMapping(value = "login", method = {RequestMethod.GET, RequestMethod.POST})
    public String login(String passport, String passwd){
        User user = userProxy.getUserByPassportAndPassword(passport,passwd);
        if(user == null){
            return "login";
        }else{
            return  "index";
        }
    }




}
