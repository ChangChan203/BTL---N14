package com.example.petshop.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import com.example.petshop.entity.User;
import com.example.petshop.payload.request.ChangePasswordRequest;
import com.example.petshop.payload.request.LoginRequest;
import com.example.petshop.payload.request.RegisterRequest;
import com.example.petshop.payload.request.UpdateProfileRequest;

public interface UserService {
    
    void register(RegisterRequest request,String siteURL) throws UnsupportedEncodingException,MessagingException;

    void sendVerificationEmail(User user, String siteURL) throws UnsupportedEncodingException,MessagingException;

    boolean verify(String verificationCode);

    User findUserByUserName(String username);

    User getUser(long id);

    User updateUser(UpdateProfileRequest request);

    void changePassword(ChangePasswordRequest request);

}
