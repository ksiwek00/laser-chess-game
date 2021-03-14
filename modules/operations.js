module.exports = {

    //insert

    insert: function (collection, data) {
        collection.insert(data, function (err, result) {
            //console.log(result)
        });
    },

    //select all - zwraca tablicę pasujących dokumentów

    selectAll: function (collection, callback) {
        collection.find().toArray(function (err, items) {
            //console.log(items)
            if (err) console.log(err)
            else callback(items)
        });
    },

    //select - zwraca tablicę pasujących dokumentów, z ograniczeniem

    selectAndLimit: function (collection) {
        collection.find({ login: "test" }).toArray(function (err, items) {
            //console.log(items)
        });
    },

    //delete - usunięcie poprzez id - uwaga na ObjectID

    deleteById: function (ObjectID, collection, id) {
        collection.remove({ _id: ObjectID(id) }, function (err, data) {
            // console.log(data)
        })
    },

    // update - aktualizacja poprzez id - uwaga na ObjectID - to funkcja, a nie string
    // uwaga: bez $set usuwa poprzedni obiekt i wstawia nowy
    // z $set - dokonuje aktualizacji tylko wybranego pola

    updateById: function (ObjectID, collection, id, record/*, newpass*/) {
        collection.updateOne(
            { _id: ObjectID(id) },

            { $set: record },
            function (err, data) {
                //console.log("update: " + data)
            })
    },


}