/* -------------------------------------------------------------
   SEMESTER SPRINT - PLAYER SYSTEM (player.js)
   Handles Vardhan's physics, animations, state, and rendering.
   ------------------------------------------------------------- */

const player = {
    x: 80,
    y: 200,
    width: 60,
    height: 80,
    spriteW: 64, // visual sizes
    spriteH: 80,
    
    // Physics
    vy: 0,
    gravity: 0.72,
    jumpForce: -13.5,
    doubleJumpForce: -11.0,
    groundY: 260,
    
    // States
    isJumping: false,
    canDoubleJump: false,
    isSliding: false,
    slideTimer: 0,
    slideDuration: 40, // frames
    
    // Animation
    animFrame: 0,
    animTick: 0,
    animSpeed: 5, // Ticks per frame
    
    // Hitbox offsets (makes the collision detection feel fair)
    getHitbox() {
        if (this.isSliding) {
            return {
                x: this.x + 8,
                y: this.y + 40,
                w: this.width - 12,
                h: this.height - 40
            };
        }
        return {
            x: this.x + 12,
            y: this.y + 8,
            w: this.width - 24,
            h: this.height - 12
        };
    },

    reset() {
        this.y = this.groundY;
        this.vy = 0;
        this.isJumping = false;
        this.canDoubleJump = false;
        this.isSliding = false;
        this.animFrame = 0;
        this.animTick = 0;
    },

    jump() {
        if (this.isSliding) return;
        
        if (!this.isJumping) {
            this.vy = this.jumpForce;
            this.isJumping = true;
            this.canDoubleJump = true;
            if (typeof synth !== 'undefined') synth.playJump();
            if (typeof spawnDust === 'function') spawnDust(this.x + 10, this.y + this.height, 8);
        } else if (this.canDoubleJump) {
            this.vy = this.doubleJumpForce;
            this.canDoubleJump = false;
            if (typeof synth !== 'undefined') synth.playJump();
            if (typeof spawnDust === 'function') spawnDust(this.x + 10, this.y + 20, 6);
        }
    },

    slide() {
        if (this.isJumping) {
            // fast drop / slam down
            this.vy = 12;
            return;
        }
        if (!this.isSliding) {
            this.isSliding = true;
            this.slideTimer = this.slideDuration;
            if (typeof synth !== 'undefined') synth.playSlide();
            if (typeof spawnDust === 'function') spawnDust(this.x + 5, this.y + this.height - 10, 5);
        }
    },

    update() {
        // Handle Slide duration
        if (this.isSliding) {
            this.slideTimer--;
            if (this.slideTimer <= 0) {
                this.isSliding = false;
            }
            // Sliding dust
            if (Math.random() < 0.3 && typeof spawnDust === 'function') {
                spawnDust(this.x - 5, this.y + this.height - 5, 2);
            }
        }

        // Gravity physics
        this.vy += this.gravity;
        this.y += this.vy;

        // Ground constraint
        const targetGround = this.isSliding ? this.groundY + 20 : this.groundY;
        if (this.y >= targetGround) {
            this.y = targetGround;
            this.vy = 0;
            this.isJumping = false;
            this.canDoubleJump = false;
        }

        // Animation ticking
        const lvl = typeof currentLevel !== 'undefined' ? currentLevel : 1;
        const state = typeof gameState !== 'undefined' ? gameState : 'MENU';
        if (lvl === 3 && !this.isJumping && !this.isSliding) {
            this.animFrame = 0;
            this.animTick = 0;
        } else {
            this.animTick++;
            if (this.animTick >= this.animSpeed) {
                this.animTick = 0;
                this.animFrame = (this.animFrame + 1) % 4; // 4 run frames
            }
        }
    },

    draw(ctx, transparentSpriteCanvas, isSpriteSheetLoaded, SPRITE_MAP, invincibilityTimer, gameState) {
        ctx.save();

        // Flash Vardhan if invincible (Chai energy!)
        if (invincibilityTimer > 0) {
            if (Math.floor(Date.now() / 50) % 2 === 0) {
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 15;
            } else {
                ctx.shadowColor = '#ff007f';
                ctx.shadowBlur = 15;
            }
        }

        if (isSpriteSheetLoaded && transparentSpriteCanvas) {
            // Render Vardhan using the spritesheet
            let sourceRect = SPRITE_MAP.run[this.animFrame]; // Running

            if (this.isJumping) {
                sourceRect = SPRITE_MAP.jump;
            } else if (this.isSliding) {
                sourceRect = SPRITE_MAP.slide;
            } else if (gameState === 'GAMEOVER') {
                sourceRect = SPRITE_MAP.hurt;
            }

            // Draw to canvas
            const scaleW = this.isSliding ? 75 : 60;
            const scaleH = this.isSliding ? 50 : 80;
            const renderY = this.isSliding ? this.y + 30 : this.y;

            ctx.drawImage(
                transparentSpriteCanvas,
                sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h,
                this.x, renderY, scaleW, scaleH
            );
        } else {
            // Fallback placeholder block rendering in case sprite loading fails
            ctx.fillStyle = invincibilityTimer > 0 ? '#ff007f' : '#fff000';
            const hBox = this.getHitbox();
            ctx.fillRect(hBox.x, hBox.y, hBox.w, hBox.h);
        }

        ctx.restore();
    }
};
