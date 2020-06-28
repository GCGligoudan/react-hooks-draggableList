// https://codesandbox.io/s/flamboyant-knuth-ytocc
import React from 'react';
import './index.css';
import useDraggable from './useDraggable';

// 该函数的作用是？
function cls(def, ...conditions) {
  const list = [def];
  conditions.forEach(cond => {
    if (cond[0]) {
      list.push(cond[1]);
    }
  });
  return list.join(" ");
}

// List
// DraggableItem
// Bar
// DraggableItem
// Bar

function Draggable({ children, eventHandlers, dragging, id}) {
  return (
    <div
      {...eventHandlers}
      draggable={true}
      className={cls('draggable', [dragging === id, 'dragging'])}
    >
      {children}
    </div>
  )
}

function Bar({id, dragging, dragOver, eventHandlers}) {
  if (id === dragging + 1) return null;

  return (
    <div
      {...eventHandlers}
      className={cls('draggable--bar', [dragOver === id, 'dragover'])}
    >
      <div
        className="inner"
        style={{
          height: id===dragOver?'80px':'0px'
        }}
      ></div>
    </div>
  )
}

function Card({ src, title }) {
  return (
    <div className="card">
      <img src={src} alt={title}/>
      <span>{title}</span>
    </div>
  )
}

function DraggableList({list}) {
  const { dragList, createDraggerProps, createDropperProps } = useDraggable(list);
  return dragList.map((item, i) => {
    if (item.type === 'BAR') {
      return <Bar id={i} {...createDropperProps(i)} key={item.id} />
    } else {
      return <Draggable {...createDraggerProps(i, item.id)}>
        <Card {...item.data} />
      </Draggable>
    }
  })
}

export default DraggableList;
