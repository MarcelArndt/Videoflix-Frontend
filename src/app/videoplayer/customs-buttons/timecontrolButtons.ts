import videojs from 'video.js';

const Button = videojs.getComponent('Button');


export function addCustomButtons(player:any){
    videojs.registerComponent('ForwardButton', ForwardButton);
    videojs.registerComponent('RewindButton', RewindButton);
    player.getChild('controlBar').addChild('RewindButton', {}, 3); 
    player.getChild('controlBar').addChild('ForwardButton', {}, 3);
}

export class RewindButton extends Button {
  constructor(player: any, options: any) {
    super(player, options);
    this.el().innerHTML = 'replay_10';
    this.el().classList.add('vjs-rewind-button');
    (this as any).controlText?.('10 Sekunden zurück');
  }

  handleClick() {
    const current = this.player().currentTime();
    if (current) this.player().currentTime(current - 10);
  }
}

export class ForwardButton extends Button {
  constructor(player: any, options: any) {
    super(player, options);
    this.el().innerHTML = 'forward_10';
    this.el().classList.add('vjs-forward-button');
    (this as any).controlText?.('10 Sekunden vor');
  }

  handleClick() {
    const current = this.player().currentTime();
    if (current) this.player().currentTime(current + 10);
  }
}

