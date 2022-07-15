module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  all: true,
  exclude: [
    'src/tests',
  ],
  include: ['src/**/*.ts'],
};
