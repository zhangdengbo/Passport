package com.yidianpuzi.domain;

import java.util.List;

public class SonPriority extends Priority {

    private String text;
    private List<SonPriority> children;

    public  void setText(String Text){
        this.text =Text;
    }
    public String getText(){
        return text;
    }

    public void setChildren(List<SonPriority> children) {
        this.children = children;
    }

    public List<SonPriority> getChildren() {
        return children;
    }
}
