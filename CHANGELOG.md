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
