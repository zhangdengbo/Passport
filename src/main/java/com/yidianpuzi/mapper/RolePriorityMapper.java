package com.yidianpuzi.mapper;

import com.yidianpuzi.domain.RolePriority;

import java.util.List;

public interface RolePriorityMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role_priority
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role_priority
     *
     * @mbg.generated
     */
    int insert(RolePriority record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role_priority
     *
     * @mbg.generated
     */
    int insertSelective(RolePriority record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role_priority
     *
     * @mbg.generated
     */
    RolePriority selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role_priority
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(RolePriority record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_role_priority
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(RolePriority record);

    List<RolePriority> getAllByRoleId(Long roleId);

    int deleteByRoleId(Long roleId);

    int insertList(List<RolePriority> list);
}