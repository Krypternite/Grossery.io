angular.module('grossery.services', [])
    .factory('initService', function () {
        return {
            'createTables': function (db) {
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS lsXlists (ls_lsid integer primary key, ls_lsname text, ls_body text, ls_date NUMERIC,ls_gross REAL) ");
                    tx.executeSql("CREATE TABLE IF NOT EXISTS rtCrates (rt_rtid integer primary key, rt_item text, rt_metric text, rt_amount REAL, rt_quantity NUMERIC) ");
                })
            }
        }
    })
    .factory('homeService', function ($q) {
        return {
            'getRecentListDetails': function (db) {
                var listDetails = [];
                return $q(function (resolve, reject) {
                    db.transaction(function (tx) {
                        tx.executeSql("SELECT ls_lsname, ls_date, ls_gross FROM lsXlists ORDER BY ls_date desc LIMIT 10 ", [], function (tx, results) {
                            if (results.rows.length > 0) {
                                for (var i = 0; i < results.rows.length; i++) {
                                    listDetails.push({
                                        'id': results.rows.item(i).ls_lsid,
                                        'title': results.rows.item(i).ls_lsname,
                                        'gross': results.rows.item(i).ls_gross,
                                        'date': results.rows.item(i).ls_date,
                                    })

                                }
                                resolve(listDetails);
                            }
                            resolve(listDetails);
                        });
                    });
                })
            }
        }
    })
    .factory('newListService', function ($q) {
        return {
            'insertNewList': function (db, newListObj) {
                return $q(function (resolve, reject) {
                    db.transaction(function (tx) {
                        tx.executeSql("INSERT INTO lsXlists (ls_lsname, ls_body, ls_date, ls_gross) VALUES ('" + newListObj.newListTitle + "','" + JSON.stringify(newListObj) + "','" + new Date().getTime() + "','" + 0 + "')", function () {
                            console.log("inserted the row");
                            resolve("Done");
                        });
                    })
                })
            }
        }
    })
    .factory('browseListService', function ($q) {
        return {
            'getListTitles': function (db) {
                var listDetails = [];
                return $q(function (resolve, reject) {
                    db.transaction(function (tx) {
                        tx.executeSql("SELECT ls_lsid, ls_lsname, ls_date, ls_gross FROM lsXlists ORDER BY ls_date desc", [], function (tx, results) {
                            if (results.rows.length > 0) {
                                for (var i = 0; i < results.rows.length; i++) {
                                    listDetails.push({
                                        'id': results.rows.item(i).ls_lsid,
                                        'title': results.rows.item(i).ls_lsname,
                                        'gross': results.rows.item(i).ls_gross,
                                        'date': results.rows.item(i).ls_date,
                                    })

                                }
                                resolve(listDetails);
                            }
                            resolve(listDetails);
                        });
                    });
                })
            },
            'getListDetails': function (db, listId) {
                var listObj = {};
                return $q(function (resolve, reject) {
                    db.transaction(function (tx) {
                        tx.executeSql("SELECT * FROM lsXlists where ls_lsid = ?", [listId], function (tx, results) {
                            if (results.rows.length > 0) {
                                for (var i = 0; i < results.rows.length; i++) {
                                    listObj = {
                                        'id': results.rows.item(i).ls_lsid,
                                        'body': JSON.parse(results.rows.item(i).ls_body),
                                        'title': results.rows.item(i).ls_lsname,
                                        'gross': results.rows.item(i).ls_gross,
                                        'date': results.rows.item(i).ls_date,
                                    }

                                }
                                console.log(listId)
                                resolve(listObj);
                            }
                        });
                    });
                })
            },
            'deleteList': function (db, listId) {

                return $q(function (resolve, reject) {
                    db.transaction(function (tx) {
                        tx.executeSql("DELETE FROM lsXlists where ls_lsid = ?", [listId], function (tx, results) {

                            resolve("Deleted");

                        });
                    });
                })
            }
        }
    })
    .factory('configService', function ($q) {
        return {
            'getRates': function (db) {
                var listDetails = [];
                return $q(function (resolve, reject) {
                    db.transaction(function (tx) {
                        tx.executeSql("SELECT ls_lsname, ls_date, ls_gross FROM lsXlists ORDER BY ls_date desc LIMIT 10 ", [], function (tx, results) {
                            if (results.rows.length > 0) {
                                for (var i = 0; i < results.rows.length; i++) {
                                    listDetails.push({
                                        'id': results.rows.item(i).ls_lsid,
                                        'title': results.rows.item(i).ls_lsname,
                                        'gross': results.rows.item(i).ls_gross,
                                        'date': results.rows.item(i).ls_date,
                                    })

                                }
                                resolve(listDetails);
                            }
                            resolve(listDetails);
                        });
                    });
                })
            }
        }
    })