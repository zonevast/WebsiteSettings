'use client'
import {AppProgressBar as ProgressBar} from 'next-nprogress-bar';
import {Suspense} from "react";

export default function HeadProgress({children}) {


    return (
        <div>
            <Suspense>
                <ProgressBar
                    height="3px"
                    color="#F5952F"
                    options={{showSpinner: false}}
                    shallowRouting
                />
            </Suspense>
            {children}
        </div>

    )
}