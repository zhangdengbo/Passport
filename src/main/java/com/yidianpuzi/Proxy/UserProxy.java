package com.yidianpuzi.Proxy;

import com.yidianpuzi.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserProxy {

    List<User> findUsers(String userName, String phone,String passport,Integer limit,Integer pageSize);

    int findUsersCount(String userName, String phone,String passport);

    void saveUser(User user);

    void updateUser(User user);

    User getUserById(Long id);

    void deleteUserById(Long id );

    User getUserByPassportAndPassword(String passport,String passwd);


}
