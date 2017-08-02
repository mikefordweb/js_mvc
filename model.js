/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function ListModel(items) {  
    this._items = items;
    this._selectedIndex = -1;

    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {  
    getItems : function () {
        return [].concat(this._items);
    },

    addItem : function (item) {
        this._items.push(item);
        this.itemAdded.notify({ item : item });
    },

    removeItemAt : function (index) {
        var item;

        item = this._items[index];
        this._items.splice(index, 1);
        this.itemRemoved.notify({ item : item });
        if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex : function () {
        return this._selectedIndex;
    },

    setSelectedIndex : function (index) {
        var previousIndex;

        previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({ previous : previousIndex });
    }
};

function Event(sender) {  
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {  
    attach : function (listener) {
        console.log("listener: " + listener);
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            console.log("this._sender: " + this._sender);
            console.log("args: " + args);
            this._listeners[index](this._sender, args);
        }
    }
};