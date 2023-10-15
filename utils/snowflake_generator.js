const EPOCH = 1609459200000;
const MACHINE_ID_BITS = 10;
const SEQUENCE_BITS = 12;

let lastTimestamp = -1;
let sequence = 0;

function generateSnowflake(machineId) {
  let timestamp = Date.now() - EPOCH;

  if (timestamp === lastTimestamp) {
    sequence = (sequence + 1) & ((1 << SEQUENCE_BITS) - 1);
    if (sequence === 0) {
      while (timestamp === lastTimestamp) {
        timestamp = Date.now() - EPOCH;
      }
    }
  } else {
    sequence = 0;
  }

  lastTimestamp = timestamp;

  const snowflakeId =
    (timestamp << (MACHINE_ID_BITS + SEQUENCE_BITS)) |
    (machineId << SEQUENCE_BITS) |
    sequence;

  return snowflakeId;
}

module.exports = {
  generateSnowflake,
};
