import React from 'react'
import { act, create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'


describe( 'ProfileStatus component test', () => {
    let component, textarea
    const mockUpdateStatus = jest.fn()

    act( () => {
            component = create( <ProfileStatus profileStatusText={ 'status is' }
                                               profileStatusFetching={ false }
                                               isAuthProfile={ true }
                                               getStatus={ () => {
                                               } }
                                               updateStatus={ mockUpdateStatus }/> )
        },
    )
    // @ts-ignore
    const root = component.root
    // const instance = component.getInstance()
    const span = root.findByType( 'span' )
    const div = root.findByType( 'div' ) //находим первый div-обёртку

    test( 'it should be received profileStatusText to component props', () => {
        expect( root.props.profileStatusText ).toBe( 'status is' )
    } )

    test( 'after creation <span> should be displayed', () => {
        expect( span ).not.toBeNull()
    } )

    test( 'after creation <span> should be contain text', () => {
        expect( span.children[0] ).toBe( 'status is' )
    } )

    test( 'after creation <textarea> shouldn`t be displayed', () => {
        expect( () => {
            textarea = root.findByType( 'textarea' )
        } ).toThrow()
    } )

    test( '<textarea> should be displayed in editMode', () => {
        // childern[0] вложеный div-обёртка, внутри которого span и на который навешано событие
        act( () => {
            div.children[0].props.onDoubleClick()
        } )
        textarea = root.findByType( 'textarea' )
        expect( textarea ).not.toBeNull()
    } )

    // test( 'updateStatus should be called', () => {
    //      act( () => {
    //         // root.disableEditMode()
    //          instance.disableEditMode()
    //     } )
    //
    //     expect(mockUpdateStatus.mock.calls.length).toBe(1)
    // } )
} )
