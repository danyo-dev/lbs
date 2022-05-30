//Temp fix for Prisma BIGINT handling
BigInt.prototype.toJSON = function () {
  return this.toString();
};
