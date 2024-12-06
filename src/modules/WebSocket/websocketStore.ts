import { makeAutoObservable } from 'mobx';

type TOptions = {
  onOpen?: () => void;
  onClose?: () => void;
  // eslint-disable-next-line
  onMessage?: (data?: any) => void;
  onError?: () => void;
};

export class WebSocketStore {
  isConnected: boolean = false;
  private ws: WebSocket | null = null;
  private readonly onOpenCallback?: () => void;
  private readonly onCloseCallback?: () => void;

  // eslint-disable-next-line
  private readonly onMessageCallback?: (data?: any) => void;
  private readonly onErrorCallback?: () => void;

  constructor(options: TOptions) {
    makeAutoObservable(this);

    this.onOpenCallback = options.onOpen;
    this.onCloseCallback = options.onClose;
    this.onMessageCallback = options.onMessage;
    this.onErrorCallback = options.onError;
  }

  connect = async (url: string) => {
    if (this.isConnected) {
      return;
    }

    try {
      this.isConnected = true;
      this.ws = new WebSocket(url);
      this.initListeners();
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      this.isConnected = false;
    }
  };

  private initListeners = () => {
    if (this.isConnected && this.ws) {
      this.ws.onopen = () => {
        this.onOpen();
      };

      this.ws.onmessage = e => {
        const data = JSON.parse(e.data);
        this.onMessage(data);
      };

      this.ws.onerror = e => {
        this.onError(e);
      };

      this.ws.onclose = e => {
        this.onClose(e);
      };
    }
  };

  private onOpen = () => {
    this.isConnected = true;
    this.onOpenCallback?.();
  };

  // eslint-disable-next-line
  private onMessage = (data: any) => {
    this.onMessageCallback?.(data);
  };

  private onError = (e: WebSocketErrorEvent) => {
    // eslint-disable-next-line
    console.log('error', e);
    this.onErrorCallback?.();
  };

  private onClose = (e: WebSocketCloseEvent) => {
    // eslint-disable-next-line
    console.log('close', e);
    this.ws = null;
    this.isConnected = false;
    this.onCloseCallback?.();
  };
}
