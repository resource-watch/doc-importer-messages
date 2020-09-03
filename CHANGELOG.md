# 1.5.0
- Add `EXECUTION_CREATE_INDEX` and `TASK_REINDEX` message types.

# 1.4.1
- Add `hash` to `STATUS_READ_DATA` and `STATUS_WRITTEN_DATA`
- Add `file` to `DATA`, `STATUS_WRITTEN_DATA`, `STATUS_READ_FILE` and `STATUS_READ_DATA`

# 1.4.0
- Remove `fileCount` from `EXECUTION_CONFIRM_REINDEX` message.
- Add docs to messages.

# 1.3.1
- Replace `npm` with `yarn`
- Add repository link to `package.json`

# 1.3.0
- Add `fileCount` to `EXECUTION_CONFIRM_REINDEX` message.
- Update develop dependencies.

# 1.2.2
- Add `EXECUTION_READ_FILE` message.

# 1.2.1
- Add `TASK_APPEND` and `EXECUTION_APPEND` messages.

# 1.2.0
- Restore `EXECUTION_CONFIRM_REINDEX` message.
- Restore `STATUS_FINISHED_REINDEX` message.
- Restore `elasticTaskId` and remove`reindexResult` in `STATUS_PERFORMED_REINDEX` message.

# 1.1.0
- Add `.idea` to ignored files.
- Remove `EXECUTION_CONFIRM_REINDEX` message.
- Remove `STATUS_FINISHED_REINDEX` message.
- Add index field to `STATUS_WRITTEN_DATA` message.
- Replace `elasticTaskId` with `reindexResult` in `STATUS_PERFORMED_REINDEX` message.

# 1.0.1
- Add STATUS_INDEX_DEACTIVATED message type
- Update vulnerable dependencies using npm audit fix
