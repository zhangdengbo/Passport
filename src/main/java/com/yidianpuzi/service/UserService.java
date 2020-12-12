package com.yidianpuzi.service;

import com.yidianpuzi.domain.User;

import java.util.List;

public interface UserService {

    List<User> findUsers(String userName, String phone, String passport, Integer pageNum, Integer pageSize);

    int findUsersCount(String userName, String phone,String passport);

    void saveUser(User user);

    void updateUser(User user);

    User getUserById(Long id);

    void deleteUserById(Long id );

    User getUserByPassportAndPassword(String passport, String passwd);
}
