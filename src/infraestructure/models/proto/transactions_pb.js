// source: transactions.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.transactions.Category', null, global);
goog.exportSymbol('proto.transactions.GetTransactionsByAccountRequest', null, global);
goog.exportSymbol('proto.transactions.GetTransactionsByAccountResponse', null, global);
goog.exportSymbol('proto.transactions.PaymentMethod', null, global);
goog.exportSymbol('proto.transactions.Transaction', null, global);
goog.exportSymbol('proto.transactions.TransactionDetail', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transactions.GetTransactionsByAccountRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transactions.GetTransactionsByAccountRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transactions.GetTransactionsByAccountRequest.displayName = 'proto.transactions.GetTransactionsByAccountRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transactions.GetTransactionsByAccountResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.transactions.GetTransactionsByAccountResponse.repeatedFields_, null);
};
goog.inherits(proto.transactions.GetTransactionsByAccountResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transactions.GetTransactionsByAccountResponse.displayName = 'proto.transactions.GetTransactionsByAccountResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transactions.Transaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.transactions.Transaction.repeatedFields_, null);
};
goog.inherits(proto.transactions.Transaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transactions.Transaction.displayName = 'proto.transactions.Transaction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transactions.TransactionDetail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transactions.TransactionDetail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transactions.TransactionDetail.displayName = 'proto.transactions.TransactionDetail';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transactions.GetTransactionsByAccountRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.transactions.GetTransactionsByAccountRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transactions.GetTransactionsByAccountRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.GetTransactionsByAccountRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    accountId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transactions.GetTransactionsByAccountRequest}
 */
proto.transactions.GetTransactionsByAccountRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transactions.GetTransactionsByAccountRequest;
  return proto.transactions.GetTransactionsByAccountRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transactions.GetTransactionsByAccountRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transactions.GetTransactionsByAccountRequest}
 */
proto.transactions.GetTransactionsByAccountRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transactions.GetTransactionsByAccountRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transactions.GetTransactionsByAccountRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transactions.GetTransactionsByAccountRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.GetTransactionsByAccountRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccountId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string account_id = 1;
 * @return {string}
 */
proto.transactions.GetTransactionsByAccountRequest.prototype.getAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.GetTransactionsByAccountRequest} returns this
 */
proto.transactions.GetTransactionsByAccountRequest.prototype.setAccountId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.transactions.GetTransactionsByAccountResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transactions.GetTransactionsByAccountResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.transactions.GetTransactionsByAccountResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transactions.GetTransactionsByAccountResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.GetTransactionsByAccountResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionsList: jspb.Message.toObjectList(msg.getTransactionsList(),
    proto.transactions.Transaction.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transactions.GetTransactionsByAccountResponse}
 */
proto.transactions.GetTransactionsByAccountResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transactions.GetTransactionsByAccountResponse;
  return proto.transactions.GetTransactionsByAccountResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transactions.GetTransactionsByAccountResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transactions.GetTransactionsByAccountResponse}
 */
proto.transactions.GetTransactionsByAccountResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.transactions.Transaction;
      reader.readMessage(value,proto.transactions.Transaction.deserializeBinaryFromReader);
      msg.addTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transactions.GetTransactionsByAccountResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transactions.GetTransactionsByAccountResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transactions.GetTransactionsByAccountResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.GetTransactionsByAccountResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.transactions.Transaction.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Transaction transactions = 1;
 * @return {!Array<!proto.transactions.Transaction>}
 */
proto.transactions.GetTransactionsByAccountResponse.prototype.getTransactionsList = function() {
  return /** @type{!Array<!proto.transactions.Transaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.transactions.Transaction, 1));
};


/**
 * @param {!Array<!proto.transactions.Transaction>} value
 * @return {!proto.transactions.GetTransactionsByAccountResponse} returns this
*/
proto.transactions.GetTransactionsByAccountResponse.prototype.setTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.transactions.Transaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.transactions.Transaction}
 */
proto.transactions.GetTransactionsByAccountResponse.prototype.addTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.transactions.Transaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.transactions.GetTransactionsByAccountResponse} returns this
 */
proto.transactions.GetTransactionsByAccountResponse.prototype.clearTransactionsList = function() {
  return this.setTransactionsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.transactions.Transaction.repeatedFields_ = [8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transactions.Transaction.prototype.toObject = function(opt_includeInstance) {
  return proto.transactions.Transaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transactions.Transaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.Transaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    source: jspb.Message.getFieldWithDefault(msg, 2, ""),
    value: jspb.Message.getFieldWithDefault(msg, 3, 0),
    date: jspb.Message.getFieldWithDefault(msg, 4, ""),
    paymentMethod: jspb.Message.getFieldWithDefault(msg, 5, 0),
    accountid: jspb.Message.getFieldWithDefault(msg, 6, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 7, ""),
    detailsList: jspb.Message.toObjectList(msg.getDetailsList(),
    proto.transactions.TransactionDetail.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transactions.Transaction}
 */
proto.transactions.Transaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transactions.Transaction;
  return proto.transactions.Transaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transactions.Transaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transactions.Transaction}
 */
proto.transactions.Transaction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setValue(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDate(value);
      break;
    case 5:
      var value = /** @type {!proto.transactions.PaymentMethod} */ (reader.readEnum());
      msg.setPaymentMethod(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountid(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 8:
      var value = new proto.transactions.TransactionDetail;
      reader.readMessage(value,proto.transactions.TransactionDetail.deserializeBinaryFromReader);
      msg.addDetails(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transactions.Transaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transactions.Transaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transactions.Transaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.Transaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSource();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getDate();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPaymentMethod();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getAccountid();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getDetailsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.transactions.TransactionDetail.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.transactions.Transaction.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string source = 2;
 * @return {string}
 */
proto.transactions.Transaction.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setSource = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 value = 3;
 * @return {number}
 */
proto.transactions.Transaction.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string date = 4;
 * @return {string}
 */
proto.transactions.Transaction.prototype.getDate = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setDate = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional PaymentMethod payment_method = 5;
 * @return {!proto.transactions.PaymentMethod}
 */
proto.transactions.Transaction.prototype.getPaymentMethod = function() {
  return /** @type {!proto.transactions.PaymentMethod} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.transactions.PaymentMethod} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setPaymentMethod = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional string accountId = 6;
 * @return {string}
 */
proto.transactions.Transaction.prototype.getAccountid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setAccountid = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string userId = 7;
 * @return {string}
 */
proto.transactions.Transaction.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * repeated TransactionDetail details = 8;
 * @return {!Array<!proto.transactions.TransactionDetail>}
 */
proto.transactions.Transaction.prototype.getDetailsList = function() {
  return /** @type{!Array<!proto.transactions.TransactionDetail>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.transactions.TransactionDetail, 8));
};


/**
 * @param {!Array<!proto.transactions.TransactionDetail>} value
 * @return {!proto.transactions.Transaction} returns this
*/
proto.transactions.Transaction.prototype.setDetailsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.transactions.TransactionDetail=} opt_value
 * @param {number=} opt_index
 * @return {!proto.transactions.TransactionDetail}
 */
proto.transactions.Transaction.prototype.addDetails = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.transactions.TransactionDetail, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.transactions.Transaction} returns this
 */
proto.transactions.Transaction.prototype.clearDetailsList = function() {
  return this.setDetailsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transactions.TransactionDetail.prototype.toObject = function(opt_includeInstance) {
  return proto.transactions.TransactionDetail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transactions.TransactionDetail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.TransactionDetail.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    quantity: jspb.Message.getFieldWithDefault(msg, 2, 0),
    name: jspb.Message.getFieldWithDefault(msg, 3, ""),
    value: jspb.Message.getFieldWithDefault(msg, 4, 0),
    category: jspb.Message.getFieldWithDefault(msg, 5, 0),
    total: jspb.Message.getFieldWithDefault(msg, 6, 0),
    unitvalue: jspb.Message.getFieldWithDefault(msg, 7, 0),
    brand: jspb.Message.getFieldWithDefault(msg, 8, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transactions.TransactionDetail}
 */
proto.transactions.TransactionDetail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transactions.TransactionDetail;
  return proto.transactions.TransactionDetail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transactions.TransactionDetail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transactions.TransactionDetail}
 */
proto.transactions.TransactionDetail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setQuantity(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setValue(value);
      break;
    case 5:
      var value = /** @type {!proto.transactions.Category} */ (reader.readEnum());
      msg.setCategory(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTotal(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setUnitvalue(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setBrand(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transactions.TransactionDetail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transactions.TransactionDetail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transactions.TransactionDetail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transactions.TransactionDetail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getQuantity();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getCategory();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getTotal();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getUnitvalue();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getBrand();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.transactions.TransactionDetail.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 quantity = 2;
 * @return {number}
 */
proto.transactions.TransactionDetail.prototype.getQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.transactions.TransactionDetail.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 value = 4;
 * @return {number}
 */
proto.transactions.TransactionDetail.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional Category category = 5;
 * @return {!proto.transactions.Category}
 */
proto.transactions.TransactionDetail.prototype.getCategory = function() {
  return /** @type {!proto.transactions.Category} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.transactions.Category} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setCategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional uint32 total = 6;
 * @return {number}
 */
proto.transactions.TransactionDetail.prototype.getTotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setTotal = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint32 unitValue = 7;
 * @return {number}
 */
proto.transactions.TransactionDetail.prototype.getUnitvalue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setUnitvalue = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional string brand = 8;
 * @return {string}
 */
proto.transactions.TransactionDetail.prototype.getBrand = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.transactions.TransactionDetail} returns this
 */
proto.transactions.TransactionDetail.prototype.setBrand = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * @enum {number}
 */
proto.transactions.PaymentMethod = {
  CREDIT: 0,
  DEBIT: 1,
  CASH: 2
};

/**
 * @enum {number}
 */
proto.transactions.Category = {
  GROCERIES: 0,
  FOOD: 1,
  CLOTHS: 2,
  PETS: 3,
  HOUSE: 4
};

goog.object.extend(exports, proto.transactions);
