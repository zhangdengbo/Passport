package com.yidianpuzi.Exception;

public class PassportException  extends RuntimeException{

    private ExceptionGrade grade = ExceptionGrade.UNSERIOUS;
    private Integer exceptionCode = 0;
    private Throwable cause = null;
    private String message = null;

    public PassportException(Integer exceptionCode, ExceptionGrade exceptionGrade, String message) {
        if (exceptionGrade != null) {
            this.grade = exceptionGrade;
        }
        if (exceptionCode != null) {
            this.exceptionCode = exceptionCode;
        }
        this.message = message;
    }

    public PassportException(ExceptionGrade exceptionGrade, String message) {
        if (exceptionGrade != null) {
            this.grade = exceptionGrade;
        }
        this.message = message;
    }


    public PassportException(ExceptionGrade exceptionGrade) {
        if (exceptionGrade != null) {
            this.grade = exceptionGrade;
        }
    }

    public ExceptionGrade getGrade() {
        return grade;
    }

    public void setGrade(ExceptionGrade grade) {
        this.grade = grade;
    }

    public Integer getExceptionCode() {
        return exceptionCode;
    }

    public void setExceptionCode(Integer exceptionCode) {
        this.exceptionCode = exceptionCode;
    }

    @Override
    public Throwable getCause() {
        return cause;
    }

    public void setCause(Throwable cause) {
        this.cause = cause;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }



}
