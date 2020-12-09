package com.yidianpuzi.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class ViewController {

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

}
