import { Box } from '@suid/material';
import Konva from 'konva/lib/Core';
import { Layer } from 'konva/lib/Layer';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Stage } from 'konva/lib/Stage';
import { Rect } from 'konva/lib/shapes/Rect';
import { Text } from 'konva/lib/shapes/Text';
import { Arrow } from 'konva/lib/shapes/Arrow';
import { onMount } from 'solid-js';
import { Group } from 'konva/lib/Group';


const WhiteBoard = () => {
    let ref: HTMLDivElement | undefined
    let stage: Stage
    let layer: Layer
    let transformer: Transformer
    let selectionRange: Rect
    var x1: number, y1: number, x2: number, y2: number;
    onMount(() => {
        stage = new Konva.Stage({
            container: ref!,
            width: ref!.clientWidth,
            height: ref!.clientHeight,
            draggable: true,
        })
        layer = new Konva.Layer();
        transformer = new Transformer();
        selectionRange = new Rect({
            fill: 'rgba(0,0,255,0.5)',
            visible: false,
        });
        layer.add(transformer)
        layer.add(selectionRange)
        stage.add(layer);
        scale()
        stage_listener()
    })

    function scale() {
        var scaleBy = 1.1;
        stage.on('wheel', (e) => {
            // stop default scrolling
            e.evt.preventDefault();

            var oldScale = stage.scaleX();
            var pointer = stage.getPointerPosition();

            var mousePointTo = {
                x: (pointer!.x - stage.x()) / oldScale,
                y: (pointer!.y - stage.y()) / oldScale,
            };

            // how to scale? Zoom in? Or zoom out?
            let direction = e.evt.deltaY > 0 ? 1 : -1;

            // when we zoom on trackpad, e.evt.ctrlKey is true
            // in that case lets revert direction
            if (e.evt.ctrlKey) {
                direction = -direction;
            }

            var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            stage.scale({ x: newScale, y: newScale });

            var newPos = {
                x: pointer!.x - mousePointTo.x * newScale,
                y: pointer!.y - mousePointTo.y * newScale,
            };
            stage.position(newPos);
        })
    }

    function stage_listener() {
        stage.on('mousemove touchmove', (e) => {
            // do nothing if we didn't start selection
            if (!selectionRange.visible()) {
                return;
            }
            e.evt.preventDefault();
            x2 = stage.getPointerPosition()!.x;
            y2 = stage.getPointerPosition()!.y;

            selectionRange.setAttrs({
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1),
            });
        });

        stage.on('mouseup touchend', (e) => {
            // do nothing if we didn't start selection
            if (!selectionRange.visible()) {
                return;
            }
            e.evt.preventDefault();
            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
                selectionRange.visible(false);
            });

            var shapes = stage.find('.rect');
            var box = selectionRange.getClientRect();
            var selected = shapes.filter((shape) =>
                Konva.Util.haveIntersection(box, shape.getClientRect())
            );
            transformer.nodes(selected);
        });

        // clicks should select/deselect shapes
        stage.on('click tap', function (e):void {
            // if we are selecting with rect, do nothing
            console.log("selection range is visible : ",selectionRange.visible())
            if (selectionRange.visible()) {
                return;
            }

            // if click on empty area - remove all selections
            console.log("is stage : ",(e.target === stage))
            if (e.target === stage) {
                transformer.nodes([]);
                return;
            }
            layer.findOne("")
            console.log("target : ",e.target)
            console.log("target name : ",e.target.name())
            // do nothing if clicked NOT on our rectangles
            if (!(e.target.hasName('rect') || e.target.hasName('text'))) {
                
                return;
            }

            // do we pressed shift or ctrl?
            const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
            const isSelected = transformer.nodes().indexOf(e.target) >= 0;
            console.log("not select : ",!metaPressed && !isSelected)
            if (!metaPressed && !isSelected) {
                // if no key pressed and the node is not selected
                // select just one
                transformer.nodes([e.target]);
            } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected
                // we need to remove it from selection:
                const nodes = transformer.nodes().slice(); // use slice to have new copy of array
                // remove node from array
                nodes.splice(nodes.indexOf(e.target), 1);
                transformer.nodes(nodes);
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = transformer.nodes().concat([e.target]);
                transformer.nodes(nodes);
            }
        });
    }

    function add_rectangle() {
        let rectangle_Group=new Group({
            x:20,
            y:20,
            draggable:true,
            name:'group'
        })
        let item = new Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            name:"rect"
        });
        const text=new Text({
            text:'',
            fontSize:12,
            fill:'#000',
            height:40,
            width:50,
            x:25,
            y:5,
            align:'center',
            verticalAlign:'center',
            name:'text',
            draggable:true
        })

        text.on('dblclick dbltap', () => {
            // create textarea over canvas with absolute position
    
            // first we need to find position for textarea
            // how to find it?
    
            // at first lets find position of text node relative to the stage:
            var textPosition = text.getAbsolutePosition();
    
            // then lets find position of stage container on the page:
            var stageBox = stage.container().getBoundingClientRect();
    
            // so position of textarea will be the sum of positions above:
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };
    
            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
    
            textarea.value = text.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = text.width()+'px';
    
            textarea.focus();
    
            textarea.addEventListener('keydown', function (e) {
              // hide on enter
              if (e.keyCode === 13) {
                text.text(textarea.value);
                document.body.removeChild(textarea);
              }
            });
          });
        
        rectangle_Group.add(item,text)
        transformer.nodes([rectangle_Group])
        layer.add(rectangle_Group);
        layer.draw();
    }

    return (
        <>
            <button onClick={add_rectangle}> Add rect</button>
            <Box ref={ref} sx={{ width: '300px', height: '300px' }}>

            </Box>
        </>
    )
}

export { WhiteBoard }