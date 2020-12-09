package com.yidianpuzi.constants;

public enum PassportExceptionStatus {
    SUCCESS(100, "success"),
    ERROR(101, "error"),
    UNDEFINED(102, "undefined");
    private int code;
    private String msg;
    PassportExceptionStatus(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static String msg(int code) {
        for (PassportStatus m : PassportStatus.values()) {
            if (m.getCode() == code) {
                return m.getMsg();
            }
        }
        return UNDEFINED.getMsg();
    }

    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }

}
