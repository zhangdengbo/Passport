package com.yidianpuzi.Exception;

/**
 * 
 * @ClassName: ExceptionGrade
 * @author: [xuezhangang]
 * @CreateDate: [2015年11月7日 下午4:09:18]
 * @UpdateUser: [lenovo]
 * @UpdateDate: [2015年11月7日 下午4:09:18]
 * @UpdateRemark: [说明本次修改内容]
 * @Description: [异常级别枚举类]
 * @version: [V1.0]
 */
public enum ExceptionGrade {
	/**
	 * 异常不严重
	 */
	UNSERIOUS(0),

	/**
	 * 异常严重
	 */
	SERIOUS(1),

	/**
	 * 异常很严重
	 */
	MORESERIOUS(2),

	/**
	 * 异常最严重
	 */
	MOSTSERIOUS(3);
	private Integer value;

	private ExceptionGrade(Integer value) {
		this.value = value;
	}

	public String toString() {
		return this.value.toString();
	}

}