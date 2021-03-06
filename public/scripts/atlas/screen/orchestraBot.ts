﻿module OrchestraBot {
    let orchestraBot: ShapeGrix

    export const NAME = "OrchestraBot"

    export const PRIM_SATALITE = "wel_sat"
    export const PRIM_STORE = "wel_store"
    export const PRIM_NATION = "wel_nat"

    export const BOT_WELCOME = "welcome"
    export const BOT_STORE = "store"
    export const BOT_NATION = "nation"
    export const BOT_STAR = "star"
    export const BOT_SPUT = "sputnik"
    export const BOT_ICON_WORLD = "world_ic"
    export const BOT_ICON_NATION = "nation_ic"
    export const BOT_ICON_STORE = "store_ic"
    export const BOT_ICON_EXIT = "exit_ic"
    export const BOT_NATION_X = "nation_"
  
    
    export const BOT_NAT_SUN_M = "sunm"
    export const BOT_NAT_SUN_L = "sunl"
    export const BOT_NAT_WIND_M = "windm"
    export const BOT_NAT_WIND_L = "windl"
    export const BOT_NAT_FERT_M = "fertm"
    export const BOT_NAT_FERT_L = "fertl"
    export const BOT_NAT_SIZE = "size"
    export const BOT_NAT_TAX = "tax"
    export const BOT_NAT_COAL = "coal"
    export const BOT_NAT_ENERGY = "energy"
    export const BOT_NAT_NATURAL = "natural"
    export const BOT_NAT_TERRAIN = "terrain"
    
    export const BOT_STAT_POL = "left_pol_ic"
    export const BOT_STAT_HAP = "left_HAP_ic"
    export const BOT_STAT_POP = "left_pop_ic"
    export const BOT_STAT_RES = "left_RES_ic"
    export const BOT_STAT_TEM = "left_temp_ic"
    
    export const BOT_STAT_MON = "right_mon_ic"
    export const BOT_STAT_TIM = "left_tim_ic"
    
    export const BOT_HOVER_NATION = "hover_nation_techs"
    

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const VERSION = "0.0.81"

    let botText = new TreeMap<String, ImgGrix>(STRING_COMPARE)

    let activeText: string
    let activeWelcome: string
    let switchTime: number

    let textWorld: ImgGrix
    let textNation: ImgGrix
    let textStore: ImgGrix
    let textExit: ImgGrix

    let timeout = 0

    export let worldUtils: SpriteGrix

    export let freeText: TextGrix

    const BUTTON_STORE = 2
    const BUTTON_NATION = 1
    const BUTTON_WORLD = 0
    const BUTTON_EXIT = 3

    const BUTTON_STATS_HAP = 4
    const BUTTON_STATS_RESOUR = 5
    const BUTTON_STATS_TEMP = 6
    const BUTTON_STATS_POLU = 7
    const BUTTON_STATS_POP = 8

    const color = Color.mkColor(227, 227, 227)

    export function registerBottext(key: string, text: string, font: Font, prim:boolean=false) {
        botText.put(key, Grix.text(text, font, Assets.LETTERS, prim? -1:Math.min(2000, vWidth * 1.9)))
        activeText = key
    }

    export function setActiveWelcome(key: string) {
        activeWelcome = key
    }

    export function setActiveBottext(key: string) {
        if (timeout <= 0) {
            activeText = key
            switchTime = 0
        }
    }

    export class OrchestraBot extends ClickableScreen {
        private message: string
        private offset: number
        private increaseOffset: number 
        private offMul:number 
        private nextScreen: string

        constructor() {
            this.message = BOT_WELCOME

            let buttons:GuiManager.IButton[] = []

            let middleW = vWidth / 2
            let middleH = vHeight

            let tex = Textures.WorldSprite

            let world = new DockButton(0, tex.ICON_WORLD, BUTTON_WORLD, textWorld, BOT_ICON_WORLD)
            let store = new DockButton(1, tex.ICON_STORE, BUTTON_STORE, textStore, BOT_ICON_STORE)
            let nation = new DockButton(2, tex.ICON_NATIO, BUTTON_NATION, textNation, BOT_ICON_NATION)
            let exit = new DockButton(3, tex.ICON_LEAVE, BUTTON_EXIT, textExit, BOT_ICON_EXIT)

            let hap = new StatsButton(0, tex.ICON_HAP, BUTTON_STATS_HAP, BOT_STAT_HAP)
            let res = new StatsButton(1, tex.ICON_RES, BUTTON_STATS_RESOUR, BOT_STAT_RES)
            let temp = new StatsButton(2, tex.ICON_TEM, BUTTON_STATS_TEMP, BOT_STAT_TEM)
            let pop = new StatsButton(3, tex.ICON_POP, BUTTON_STATS_POP, BOT_STAT_POP)
            let pol = new StatsButton(4, tex.ICON_CO2, BUTTON_STATS_POLU, BOT_STAT_POL)

            buttons.push(world)
            buttons.push(store)
            buttons.push(nation)
            buttons.push(exit)

            buttons.push(hap)
            buttons.push(res)
            buttons.push(temp)
            buttons.push(pop)
            buttons.push(pol)

            this.offset = 0
            this.increaseOffset = 0
            this.offMul = 1

            super(buttons)
        }

        setStickMessage(stick: string) {
            this.message = stick
            timeout = 1
        }

        static setup() {
            let font = Textures.fontSmall

            registerBottext(BOT_WELCOME, "I am Orchestra-Bot and I will be guiding you throught this experience. Hover over elements for information.", font)
            registerBottext(BOT_STORE, " Here you can invest your precious money in new or existing technologies. The more you invest, the more the technology develops, it’s really exciting!", font)
            registerBottext(BOT_NATION, "This is your very own nation! You can see all your nation related statistics here.", font)
            registerBottext(BOT_SPUT, "This little one is Sputnik, he keeps a close wacht over the Earth. My little brother lives there, we should visit some time.", font)
            registerBottext(BOT_STAR, "How perceptive of you! This is the only stationary star ever discovered. How? Nobody knows...", font)
            registerBottext(BOT_ICON_WORLD, "In the world view you can see the world, your overall statistics, go to other screens and best of all... have a nice chat with me, Orchestra-Bot!", font)
            registerBottext(BOT_ICON_NATION, "In the nation view you can visit you own nation. Did you know you can also view nations of other players? Try clicking the little dots on the world!", font)
            registerBottext(BOT_ICON_STORE, "In the store you can invest your precious money in new or existing technologies. The more you invest the more the technology develops, it's really exciting!", font)
            registerBottext(BOT_ICON_EXIT, "By clicking this button you will leave ALTAS and head back to Earth. Are you sure you want to leave me...", font)

            registerBottext(PRIM_SATALITE, "Welcome to ATLAS satalite " + VERSION + "α", Textures.fontBig, true)
            registerBottext(PRIM_STORE, "Welcome to St.Ores Store! Less for more~!!", Textures.fontBig, true)
            registerBottext(PRIM_NATION, CityScreen.NATION_NAME[id] + ", a titan amongst nations.", Textures.fontBig, true)
            
            registerBottext(BOT_NATION_X + "0", "This is the United States of Boscor! Click here for more information about this nation.", font)
            registerBottext(BOT_NATION_X + "1", "This is the Republic of Mypos! Click here for more information about this nation.", font)
            registerBottext(BOT_NATION_X + "2", "This is the Mushroom Kingdom! Click here for more information about this nation.", font)
            registerBottext(BOT_NATION_X + "3", "This is Drachma! Click here for more information about this nation.", font)
            registerBottext(BOT_NATION_X + "4", "This is Krikkit! Click here for more information about this nation.", font)
            registerBottext(BOT_NATION_X + "5", "This is Asgard! Click here for more information about this nation.", font)
            
            registerBottext(BOT_STAT_POL, "Click to see global pollution levels over time and which nation produces the most.", font)
            registerBottext(BOT_STAT_HAP, "This displays the happiness of your population, happiness is based off quality of living and the success of your local football team.", font)
            registerBottext(BOT_STAT_POP, "Click to see the population and the current state of migration in your nation.", font)
            registerBottext(BOT_STAT_RES, "Click to see the resources that you have left in your nation.", font)
            registerBottext(BOT_STAT_TEM, "Shows the mean global temperature over time.", font)
            
            registerBottext(BOT_STAT_TIM, "This is the date in the game, it takes about a minute for a year to pass.", font)
            registerBottext(BOT_STAT_MON, "This is how much money you have available for research. As you invest this will decrease over time, aim to balance the money you invest with the money you earn.", font)
            
            orchestraBot = Grix.shape().quad(600, 150).setColor(new AColor(color, 0.05)).populate()

            setActiveBottext(BOT_WELCOME)
            setActiveWelcome(PRIM_SATALITE)

            worldUtils = Grix.fromSprite(Textures.worldSprite)

            freeText = Grix.fromFontMap(Textures.fontMapSmall)

            font = Textures.fontBig
            textWorld = Grix.text("World View", font)
            textNation = Grix.text("Nation View", font)
            textStore = Grix.text("Visit Store", font)
            textExit = Grix.text("Exit Game", font)
        }

        getRenderOffset(): number {
            return this.offset * this.offMul
        }

        render(delta: number) {
            if (GuiManager.getHudAlpha()) orchestraBot.setColor(new AColor(color, 0.2+GuiManager.getHudAlpha()))
            orchestraBot.scaleToSize(vWidth, 120)
            orchestraBot.render()

            let alpha = GuiManager.getHudAlpha()
            let shad = Shader.getShader(Shader.TEXTURE)

            Plena.forceRender()

            if (alpha) {
                shad.bind()
                shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha / (0.05)])
            }

            worldUtils.clean()
            worldUtils.activeImg(Textures.WorldSprite.DOCK)
            worldUtils.setPivotMove(0.5, 1)
            worldUtils.moveTo(vWidth / 2, vHeight)
            worldUtils.render()

            worldUtils.activeImg(Textures.WorldSprite.DOCK_SIDE)
            worldUtils.setPivotMove(0, 1)
            worldUtils.moveTo(0, vHeight)
            worldUtils.render()

            worldUtils.activeImg(Textures.WorldSprite.DOCK_SIDER)
            worldUtils.setPivotMove(1, 1)
            worldUtils.moveTo(vWidth, vHeight)
            worldUtils.render()

            Plena.forceRender()

            if (alpha) {
                shad.bind()
                shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])
            }

            botText.apply(activeWelcome).scaleTo(0.5, 0.5)
            botText.apply(activeWelcome).setPivotMove(0.5, 0)
            botText.apply(activeWelcome).moveTo(vWidth / 2, 16)
            botText.apply(activeWelcome).render()

            botText.apply(activeText).scaleTo(0.5, 0.5)
            botText.apply(activeText).setPivotMove(0.5, 0)
            botText.apply(activeText).moveTo(vWidth / 2, 60)
            botText.apply(activeText).render()

            if (World.ready()) {
                let time = World.getTime()
                let timeMonth = Math.floor((time - Math.floor(time)) * 12)

                let timeText = (2016 + time).toFixed(0) + " " + MONTHS[timeMonth]
                let moneyText = "$" + (Nation.getData().money / 1000000000).toFixed(0) + " Bilion"

                let ww = worldUtils.activeImg(Textures.WorldSprite.DOCK_SIDER).getWidth()

                freeText.scaleTo(0.5, 0.5)

                let moneyLength = freeText.length(moneyText)
                let moneyLeft = vWidth - ww / 2 - moneyLength / 2

                let timeLength = freeText.length(timeText)
                let timeLeft = vWidth - ww / 2 - timeLength / 2

                freeText.moveTo(moneyLeft, vHeight - 45)
                freeText.freeText(moneyText)
                freeText.moveTo(timeLeft, vHeight - 75)
                freeText.freeText(timeText)

                if (vmx > moneyLeft && vmx < moneyLeft + moneyLength && vmy > vHeight - 50 && vmy < vHeight - 30) {
                    setActiveBottext(BOT_STAT_MON)
                }

                if (vmx > timeLeft && vmx < timeLeft + timeLength && vmy > vHeight - 80 && vmy < vHeight - 60) {
                    setActiveBottext(BOT_STAT_TIM)
                }
            }

            Plena.forceRender()

            if (alpha) {
                shad.bind()
                shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])
            }

            super.render(delta)
        }

        startSlide(right: boolean, nextScreen: string) {
            if (this.offMul)
            this.nextScreen = nextScreen
            this.increaseOffset = 3
            this.offMul = right? -1:1
        }

        buttonClicked(id: number) {
            if (this.offset != 0) return

            let current = GuiManager.getCurrentScreenName()

            switch (id) {
                case BUTTON_STORE:
                    if (current != StoreScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(current != WorldScreen.NAME, StoreScreen.NAME)
                        } else {
                            $('canvas').fadeOut(200, function () {
                                GuiManager.loadScreen(StoreScreen.NAME)
                                $('canvas').fadeIn(200)
                            })
                        }
                    }
                    break
                case BUTTON_NATION:
                    if (current != CityScreen.NAME) {
                        $('canvas').fadeOut(200, function () {
                            GuiManager.loadScreen(CityScreen.NAME)
                            $('canvas').fadeIn(200)
                        })
                    }
                    break
                case BUTTON_WORLD:
                    if (current!= WorldScreen.NAME) {
                        if (current != CityScreen.NAME) {
                            this.startSlide(true, WorldScreen.NAME)
                        } else {
                            $('canvas').fadeOut(200, function () {
                                GuiManager.loadScreen(WorldScreen.NAME)
                                $('canvas').fadeIn(200)
                            })
                        }
                    }
                    break
            }
        }

        update(delta: number) {
            switchTime += delta

            if (timeout > 0) timeout-=1

            if (this.nextScreen) {
                this.offset += this.increaseOffset * delta
                if (this.offset > (vWidth/2) + 500) {
                    GuiManager.loadScreen(this.nextScreen)
                    this.nextScreen = null
                    this.offMul = -this.offMul
                }
            } else if (this.offset != 0) {
                this.offset -= this.increaseOffset * delta
                if (this.offset <= 0) {
                    this.offset = 0
                    this.increaseOffset = 0
                }
            }

            if (switchTime > 1500) setActiveBottext(this.message)

            super.update(delta)
        }
    }

    class StatsButton extends SimpleButton {
        icon: string
        bot: string

        constructor(index: number, icon: string, id: number, bot:string) {
            super(28, vHeight - 55 - (index) * 72, 32, 32, id)
            this.icon = icon
            this.bot = bot
        }

        render(delta: number) {
            worldUtils.clean()
            worldUtils.activeImg(this.icon)
            worldUtils.setPivotMove(0.5, 0.5)
            worldUtils.scaleToSize(this.width, this.height)
            worldUtils.moveTo(this.x + 16, this.y + 16)
            worldUtils.render()

            Plena.forceRender()

            if (this.hover) {
                setActiveBottext(this.bot)

                let alpha = GuiManager.getHudAlpha()
                let shad = Shader.getShader(Shader.TEXTURE)

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha / (0.05)])
                }

                worldUtils.activeImg(Textures.WorldSprite.BUBBLE)
                worldUtils.setPivotMove(0, 0.5)
                worldUtils.moveTo(this.x + 66, this.y + 16)
                worldUtils.render()

                let widthi = worldUtils.getWidth()
                let text = ""

                if (World.ready) {
                    switch (this.id) {
                        case BUTTON_STATS_HAP:
                            text = "...not implemented yet..."
                            break;
                        case BUTTON_STATS_POLU:
                            text = ((Nation.getData().pollution/300000).toFixed(2)) + "%"
                            break;
                        case BUTTON_STATS_POP:
                            text = (Nation.getData().population / 1000000).toFixed(1) + " Million"
                            break;
                        case BUTTON_STATS_RESOUR:
                            text = Nation.getData().resourcesE.toFixed(0) + "MWh/km²"
                            break;
                        case BUTTON_STATS_TEMP:
                            text = Nation.getTemperatire().toFixed(2) + "C"
                            break;
                    }
                }
                    
                Plena.forceRender()

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])
                }

                freeText.setPivotMove(0.5, 1)
                freeText.scaleTo(0.5, 0.5)
                freeText.moveTo(this.x + 66 + widthi / 2 - freeText.length(text) / 2, this.y + 8)
                freeText.freeText(text)

                Plena.forceRender()

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])
                }
            }
        }
    }

    class DockButton extends SimpleButton {
        icon: string
        bot: string
        text: ImgGrix

        constructor(index: number, icon: string, id: number, text: ImgGrix, bot: string) {
            let middleW = vWidth / 2
            let middleH = vHeight

            super(middleW - 203 + index * 101, middleH - 95, 100, 100, id)
            this.icon = icon
            this.text = text
            this.bot = bot
        }

        render(delta: number) {
            Plena.forceRender()

            worldUtils.clean()
            worldUtils.activeImg(this.icon)
            worldUtils.scaleToSize(this.width, this.height)
            worldUtils.moveTo(this.x, this.y)
            worldUtils.render()
            Plena.forceRender()

            if (this.isMouseOver()) {
                setActiveBottext(this.bot)

                worldUtils.clean()

                worldUtils.activeImg(Textures.WorldSprite.DOCK)
                let dockHeight = worldUtils.getHeight()

                let alpha = GuiManager.getHudAlpha()
                let shad = Shader.getShader(Shader.TEXTURE)

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, alpha / (0.05)])
                }

                worldUtils.activeImg(Textures.WorldSprite.BUBBLE)
                worldUtils.setPivotMove(0.5, 1)
                worldUtils.moveTo(vWidth / 2, vHeight - dockHeight - 8)
                worldUtils.render()

                let height = worldUtils.getHeight()

                Plena.forceRender()

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [0.1, 0.1, 0.1, 1])
                }

                this.text.setPivotMove(0.5, 0.5)
                this.text.scaleTo(0.5, 0.5)
                this.text.moveTo(vWidth / 2, vHeight - dockHeight - height / 2 + 3)
                this.text.render()

                Plena.forceRender()

                if (alpha) {
                    shad.bind()
                    shad.setVec4(Shader.Uniforms.COLOR, [1, 1, 1, 1])
                }
            }
        }
    }
}
