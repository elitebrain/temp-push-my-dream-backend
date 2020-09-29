## Internet Explorer append error

```
node_modules/react-kakao-login/dist/index.es.js, node_modules/react-kakao-login/dist/index.js
각 파일에 append -> appendChild로 수정
(대체 라이브러리 찾거나 issue해결 요청)
```

## IMAGE upload error

### issue

```
프로필수정(/mypage/edit)에서 photo 변경하면 저장 안되던 issue
```

### how to solve

```
backend/src/middlewares multerS3({...}) 내부에 key -> Key로 변경
```

## OUTPUT error

### error msg

```
UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'kind' of undefined

Message: Request textDocument/codeAction failed with message: Cannot read property 'kind' of undefined
```

### how to solve

```
check the <style jsx> tag
```

#### wrong

```
<style jsx>
  {`
    tag {
      abc: def;
    }
  }`
</style>
```

#### right

```
<style jsx>{`
  tag {
    abc: def;
  }
`}</style>
```
# push-my-dream-live
