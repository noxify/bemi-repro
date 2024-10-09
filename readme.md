The repo is currently configured to produce the error:

# installation

```
git clone https://github.com/noxify/bemi-repro
cd bemi-repro
pnpm i
cp .env.example .env
pnpm db:generate
pnpm db:migrate:dev
```

## run the app

```
pnpm dev
```

> The dev command will start the frontend app ( nextjs ) and also the mock server to test the oauth via lucia.

Now open the browser at http://localhost:3000

## Different prisma configurations

- If you want to use the `driverAdapter` configuration, just rename the `index_driverAdapter.ts` to `index.ts` inside the `packages/db` folder
  and run the command above again.
- If you want to use the "default prisma" configuration, just rename the `index_init.ts` to `index.ts` inside the `packages/db` folder
  and run the command above again.

## environment

### System

```
Operating System:
  Platform: macOS 15.0.1
  Available memory (MB): 36864
  Available CPU cores: 12
Binaries:
  Node: 22.5.1
  npm: 10.8.2
  pnpm: 9.12.1
Relevant Packages:
  next: 14.2.15
  react: 18.3.1
  react-dom: 18.3.1
  typescript: 5.6.3
```

### Database

For the database I'm using [DBNgin](https://github.com/TablePlus/DBngin).

It's postgres ;) The version is 16.4.

I just created the rds instance and changed the password for the `postgres` user.

The rest is the default configuration.

## Full error

```
│   ▲ Next.js 14.2.15
│   - Local:        http://localhost:3000
│
│  ✓ Starting...
│  ✓ Ready in 2.1s
│  ✓ Compiled /src/middleware in 115ms (89 modules)
│  ✓ Compiled /api/auth/verify-session in 299ms (112 modules)
│
│   #  next-server (v14.2.15)[46997]: napi_status napi_release_threadsafe_function(napi_threadsafe_function, napi_threadsafe_function_release_mode) at ../src/node_ap
│ i.cc:1403
│   #  Assertion failed: (func) != nullptr
│
│ ----- Native stack trace -----
│
│  1: 0x102b35d7c node::Assert(node::AssertionInfo const&) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│  2: 0x1047280c4 napi_release_threadsafe_function.cold.1 [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│  3: 0x102b01e34 napi_release_threadsafe_function [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│  4: 0x12dbef0e4 napi_register_module_v1 [/Users/marcusreinhardt/Development/bemi-repro/node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node]
│  5: 0x12d91d64c  [/Users/marcusreinhardt/Development/bemi-repro/node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node]
│  6: 0x12d91e2c0  [/Users/marcusreinhardt/Development/bemi-repro/node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node]
│  7: 0x12d878848  [/Users/marcusreinhardt/Development/bemi-repro/node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node]
│  8: 0x12d87339c  [/Users/marcusreinhardt/Development/bemi-repro/node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node]
│  9: 0x102aeead0 v8impl::(anonymous namespace)::FunctionCallbackWrapper::Invoke(v8::FunctionCallbackInfo<v8::Value> const&) [/Users/marcusreinhardt/.nvm/versions/no
│ de/v22.5.1/bin/node]
│ 10: 0x102d5605c v8::internal::FunctionCallbackArguments::Call(v8::internal::Tagged<v8::internal::FunctionTemplateInfo>) [/Users/marcusreinhardt/.nvm/versions/node/
│ v22.5.1/bin/node]
│ 11: 0x102d55be4 v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<true>(v8::internal::Isolate*, v8::internal
│ ::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::FunctionTemplateInfo>, v8::internal::Handle<v8::internal::Object>, unsigned long*, int) [/Us
│ ers/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 12: 0x102d55578 v8::internal::Builtin_HandleApiConstruct(int, unsigned long*, v8::internal::Isolate*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 13: 0x103825b94 Builtins_CEntry_Return1_ArgvOnStack_BuiltinExit [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 14: 0x103791c78 construct_stub_invoke_deopt_addr [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 15: 0x1039073f0 Builtins_ConstructHandler [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 16: 0x103790ef0 Builtins_InterpreterEntryTrampoline [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 17: 0x1037cd410 Builtins_AsyncFunctionAwaitResolveClosure [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 18: 0x103898578 Builtins_PromiseFulfillReactionJob [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 19: 0x1037bd714 Builtins_RunMicrotasks [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 20: 0x10378eaf4 Builtins_JSRunMicrotasksEntry [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 21: 0x102e38040 v8::internal::(anonymous namespace)::Invoke(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) [/Users/marcusreinhar
│ dt/.nvm/versions/node/v22.5.1/bin/node]
│ 22: 0x102e384d0 v8::internal::(anonymous namespace)::InvokeWithTryCatch(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) [/Users/m
│ arcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 23: 0x102e3860c v8::internal::Execution::TryRunMicrotasks(v8::internal::Isolate*, v8::internal::MicrotaskQueue*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1
│ /bin/node]
│ 24: 0x102e626cc v8::internal::MicrotaskQueue::RunMicrotasks(v8::internal::Isolate*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 25: 0x102e62e6c v8::internal::MicrotaskQueue::PerformCheckpoint(v8::Isolate*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 26: 0x102a58c4c node::InternalCallbackScope::Close() [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 27: 0x102a587bc node::InternalCallbackScope::~InternalCallbackScope() [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 28: 0x102b3a1f4 node::fs::FileHandle::CloseReq::Resolve() [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 29: 0x102b531e8 node::fs::FileHandle::ClosePromise()::$_0::__invoke(uv_fs_s*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 30: 0x102b301d4 node::MakeLibuvRequestCallback<uv_fs_s, void (*)(uv_fs_s*)>::Wrapper(uv_fs_s*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 31: 0x10376c574 uv__work_done [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 32: 0x103770048 uv__async_io [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 33: 0x10378260c uv__io_poll [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 34: 0x10377060c uv_run [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 35: 0x102a59714 node::SpinEventLoopInternal(node::Environment*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 36: 0x102b773f4 node::NodeMainInstance::Run(node::ExitCode*, node::Environment*) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 37: 0x102b7718c node::NodeMainInstance::Run() [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 38: 0x102afd800 node::Start(int, char**) [/Users/marcusreinhardt/.nvm/versions/node/v22.5.1/bin/node]
│ 39: 0x18b5d8274 start [/usr/lib/dyld]
│
│ ----- JavaScript stack trace -----
│
│ 1: loadEngine (/Users/marcusreinhardt/Development/bemi-repro/node_modules/@prisma/client/runtime/library.js:111:652)
```
