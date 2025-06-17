import React from "react";

export default function ExtensionWindowContainer({ children }: { children: React.JSX.Element | React.JSX.Element[] | null }) {
    return (
        <div className="w-[800px] h-[600px] overflow-scroll">
            {children}
        </div>)
}