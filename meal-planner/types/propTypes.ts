import React from "react";

export interface NavLinkProps {
    route: string;
    children: React.ReactNode;
    color?: string;
    large?: boolean;
    onClick?: React.MouseEventHandler<Element>
}