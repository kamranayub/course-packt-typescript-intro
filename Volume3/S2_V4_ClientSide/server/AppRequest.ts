import express = require('express');

/**
 * Represents our extended Express web request
 */
export interface AppRequest extends express.Request {

    /**
     * Expose user service on request
     */
    userService: UserService;
}

/**
 * Strongly-typed request with body
 */
export interface AppRequestWithBody<TBody> extends AppRequest {
    
    /**
     * Body of type TBody
     */
    body: TBody;
}

/**
 * Strongly-typed request with body
 */
export interface AppRequestWithParams<TParams> extends AppRequest {
    
    /**
     * Params of type TParams
     */
    params: TParams;
}