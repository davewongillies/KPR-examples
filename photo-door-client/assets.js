/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */
 
export var leftArrowSkin = new Skin({texture: new Texture('./assets/scroll-arrow-left.png',2), x:0, y:0,width:19,height:25,aspect:"fit"});
export var rightArrowSkin = new Skin({texture: new Texture('./assets/scroll-arrow-right.png',2), x:0, y:0,width:19,height:25,aspect:"fit"});
export var refreshSkin = new Skin({texture: new Texture('./assets/refresh.png',2), x:0, x:0, y:0,width:21,height:21,aspect:"fit"});
export var trashSkin = new Skin({texture: new Texture('./assets/trash.png',2), x:0, x:0, y:0,width:256,height:256,aspect:"fit"});

export var menuBarColor = new Skin("#666666");
export var settingTopColor = new Skin("#666666");
export var topBarColor = new Skin("#9b9b9b"); 
export var whiteSkin = new Skin("white");

export var topRefreshStyle = new Style({ font:"15px", color:"white", horizontal:"left",vertical:"middle" })
export var topBarMainStyle = new Style({ font:"24px", color:"white", horizontal:"left",vertical:"middle" });
export var menuTitleStyle = new Style({ font:"15px", color:"white", horizontal:"left",vertical:"middle",margins:{left:10}});
export var menuContentStyle = new Style({ font:"15px", color:"black", horizontal:"left",vertical:"middle" });
export var menuContentStyleRight = new Style({ font:"15px", color:"#8e8e93", horizontal:"right",vertical:"middle" });
export var photoStyleBelow = new Style({ font:"14px", color:"#8e8e93", horizontal:"center",vertical:"middle",line:2 });


let busySkin = new Skin({texture: new Texture('./assets/busy.png',2), x:0, x:0, y:0,width:50,height:50,aspect:"fit",variants:50});
let emptySkin = new Skin({ texture: new Texture('./assets/mainTexture',2), x: 50, y: 150, width: 50, height: 50, });
let errorStyle  = new Style({ color: 'black', font: 'bold 14px', horizontal: 'center' });

class BusyBehavior extends Behavior{

export var BusyLine = Container.template($ => ({ 

export var EmptyLine = Container.template($ => ({ 
}));

export var ErrorLine = Container.template($ => ({ 
			skin: errorSkin, 
			contents: [
		}),
}));

export class PanZoomBehavior extends Behavior {
	onCreate(pic,data) {
		this.data = data;
		this.olds = [null,null];
		this.news = [null,null];
	}
	onSetValue(pic,url,timeString,name) {
		this.data.url = url;
		this.data.TITLE.string = timeString;
		this.data.name = name;
		pic.load(this.data.url);
	}
	onLoaded(pic) {
		pic.translation = {x:0,y:0};
		pic.scale = {x:1,y:1};
		pic.origin = { x: pic.width / 2, y: pic.height / 2 };
	}
	onTouchBegan(pic,id, x, y, ticks){
		if(id>1) return;
		this.olds[id] = {x:x,y:y};
		pic.time = 0;
		pic.start();
	}
	onTouchMoved(pic,id, x, y, ticks){
		if(id>1) return;
		this.news[id] = {x:x,y:y};
		this.compute(pic);
	}
	onTouchEnded(pic,id, x, y, ticks){
		if(id>1) return;
		this.olds[id] = this.news[id] = null;
		if(pic.time<100) {
			this.onTap(pic);
		}
	}
	onTap(pic){
		pic.translation = {x:0,y:0};
		pic.scale = {x:1,y:1};
	}
	distance(p0x, p0y, p1x, p1y) {
		return Math.sqrt((p1x - p0x) * (p1x - p0x) + (p1y - p0y) * (p1y - p0y))
	}
	compute(pic){
		var old0 = this.olds[0];
		var old1 = this.olds[1];
		var new0 = this.news[0];
		var new1 = this.news[1];
		if (new0 && new1 && old0 && old1) {
			var scale = pic.scale;
			var oldDistance = this.distance(old0.x, old0.y, old1.x, old1.y);
			var newDistance = this.distance(new0.x, new0.y, new1.x, new1.y);
			scale.x *= newDistance / oldDistance;
			scale.y *= newDistance / oldDistance;
			if(scale.x>5 || scale.y>5)
				scale.x = scale.y = 5;
			if(scale.x<=1 || scale.y<=1) {
				scale.x = scale.y = 1;
				pic.translation = {x:0,y:0};
			}
			this.olds[0] = new0;
			this.olds[1] = new1;
			pic.scale = scale;
		}
		else if(new0 && old0 && pic.scale.x>1) {
			var translation = pic.translation;
			translation.x += (new0.x - old0.x);
			translation.y += (new0.y - old0.y);
			pic.translation = translation;
			this.olds[0] = new0;
		}
		else if(new1 && old1 && pic.scale.x>1) {
			var translation = pic.translation;
			translation.x = new1.x - old1.x;
			translation.y = new1.y - old1.y;
			pic.translation = translation;
			this.olds[1] = new1;
		}
	}
}

export class ListBehavior extends Behavior{

export class ButtonBehavior extends Behavior{

export class ListItemBehavior extends Behavior {
	changeState(line, state) {
		line.state = state;
	}
	onCreate(line, data) {
		this.data = data;
		this.waiting = false;
	}
	onFinished(line) {
		if (this.waiting) {
			this.waiting = false;
			this.changeState(line, 1);
		}
	}
	onTap(line) {
		var list = line.container;
		list.behavior.onItemTap(list, line);
		var data = this.data;
		if (data && ("action" in data))
			line.invoke(new Message(data.action));
	}
	onTimeChanged(line) {
		if (!this.waiting)
			this.changeState(line, 1 - line.fraction);
	}
	onTouchBegan(line, id, x, y, ticks) {
		this.waiting = true;
		line.duration = 100;
		line.time = 0;
		line.start();
	}
	onTouchCancelled(line, id, x, y, ticks) {
		if (this.waiting) {
			line.stop();
			this.waiting = false;
		}
		else {
			line.duration = 500;
			line.time = 0;
			line.start();
		}
	}
	onTouchEnded(line, id, x, y, ticks) {
		if (this.waiting) {
			line.stop();
			this.waiting = false;
			this.changeState(line, 1);
		}
		line.captureTouch(id, x, y, ticks);
		this.onTap(line);
	}
};