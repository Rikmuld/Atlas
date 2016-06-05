﻿module TechScreen {
	let tech:number
    let cat: Technologies.TechCat
    let container: WritableGrix

    let heading: TextGrix
    let text: TextGrix

    let invest: ImgGrix
    let research: ImgGrix
    let stopResearch: ImgGrix

    let box: ImgGrix

    export const NAME = "TechScreen"

    const INVEST_BUTTON = 50

    let shape: ShapeGrix

    export function loadTechScreen(techn: number, cata: Technologies.TechCat, reverse:boolean = false) {
        tech = techn
        cat = cata

        GuiManager.getHUD().startSlide(reverse, NAME)
    }

    export class TechScreen extends StarsScreen.StarsScreen {
        height: number
        tech: number
        techn: Technologies.Tech

        constructor() {
            let buttons: GuiManager.IButton[] = []

            let techs = cat.getTechIDs()
            let size = techs.length

            for (let t = 0; t < size; t++) {
                buttons.push(new TechButton(vWidth / 2 - (size - 1) * 65 + t * 130, vHeight/2-260, techs[t]))
            }

            buttons.push(new InvestButton(vWidth / 2, vHeight / 2 + 190, INVEST_BUTTON))

            super(buttons)

            this.height = vHeight / 2
            this.tech = tech
            this.techn = Technologies.getTech(tech)

            container.setBackground(Color.mkAlphaColor(cat.getColor() as Color, 0.35))
            container.startWrite(view)

            heading.moveTo(60, 100)
            heading.freeText(this.techn.getName())
            text.moveTo(60, 200)
            text.freeText(this.techn.getDescription(), 1200)

            Technologies.getTech(this.tech).render(1440, 160, 0.5, false)

            container.endWrite()
        }

        static setup() {
            shape = new ShapeGrix().quad(1, 1).populate()
            heading = Grix.fromFontMap(Assets.mkFontMap(Textures.fontBig))
            text = Grix.fromFontMap(Assets.mkFontMap(Textures.fontSmall))
            container = Grix.writable(Assets.mkWritableImg(1600, 800))
            invest = Grix.text("Invest!", Textures.fontBig)
            research = Grix.text("Researching...", Textures.fontBig)
            stopResearch = Grix.text("Stop Research", Textures.fontBig)

            let canvas = Assets.mkCanvas(500, 120)
            canvas.strokeStyle = Color.White.WHITE.style()
            canvas.lineWidth = 8
            canvas.strokeRect(0, 0, 500, 120)
            box = Grix.fromTexture(canvas)
        }

        update(delta: number) {
            super.update(delta)
        }

        render(delta: number) {
            super.renderStars()

            camera.setView(GuiManager.getHUD().getRenderOffset(), 0)
            view.view()

            container.scaleTo(0.5, 0.5)
            container.setPivotMove(0.5, 0.5)
            container.moveTo(vWidth / 2, vHeight / 2 + 50)
            container.render()
            Plena.forceRender()

            super.render(delta)

            camera.setView(0, 0)
            view.view()
        }

        buttonClicked(id: number) {
            if (id == INVEST_BUTTON) {
                if (this.techn.isInResearch()) this.techn.stopResearch()
                else this.techn.enableResearch(0)
            } else {
                let techs = cat.getTechIDs()

                if (id != tech) {
                    tech = id
                    GuiManager.loadScreen(NAME)
                }
            }   
        }
    }

    class InvestButton extends SimpleButton {
        techn: Technologies.Tech

        constructor(x: number, y: number, id: number) {
            super(x, y, research.getWidth(), invest.getHeight() * 1.25, id)

            this.techn = Technologies.getTech(tech)
        }

        render() {
            let text = this.techn.isInResearch() ? this.hover ? stopResearch : research : invest

            text.setPivotMove(0.5, 0.25)
            text.scaleTo(0.5, 0.5)
            text.moveTo(this.x, this.y)
            text.render()

            box.scaleTo(0.5, 0.5)
            box.setPivotMove(0.5, 0.5)
            box.moveTo(this.x, this.y)
            box.render()
        }

        isInBox(x: number, y: number): boolean {
            return (x >= this.x - this.width / 2 && x <= this.x - this.width / 2 + this.width && y >= this.y - this.height / 2 && y <= this.y + - this.height / 2 + this.height)
        }
    }

    class TechButton extends SimpleButton {
        constructor(x:number, y:number, tech:number) {
            super(x, y, 99, 99, tech)
        }

        render(delta: number) {
            Technologies.getTech(this.id).render(this.x, this.y, 0.25)
        }

        isInBox(x: number, y: number): boolean {
            return inCircularRange(this.x, this.y, this.width/2)
        }
    }
}